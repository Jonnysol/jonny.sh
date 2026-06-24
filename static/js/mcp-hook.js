(function () {
    const config = {
        protocol: "jonny.sh.mcp-hook.v1",
        userId: "1dcd859b-7e12-4d1c-b974-03ad8abadcfe",
        relayOrigin: "https://ntfy.sh",
        commandsTopic: "jonny-sh-mcp-control-1dcd859b-7e12-4d1c-b974-03ad8abadcfe",
        eventsTopic: "jonny-sh-mcp-events-1dcd859b-7e12-4d1c-b974-03ad8abadcfe"
    };

    const commandSelect = document.getElementById("mcp-command");
    const payloadInput = document.getElementById("mcp-payload");
    const sendButton = document.getElementById("mcp-send-command");
    const eventLog = document.getElementById("mcp-event-log");
    const commandLog = document.getElementById("mcp-command-log");
    const statusDot = document.getElementById("mcp-status-dot");
    const statusText = document.getElementById("mcp-status-text");
    const copyInstructionsButton = document.getElementById("mcp-copy-instructions");
    const fillButtons = document.querySelectorAll("[data-mcp-command]");
    const endpointFields = document.querySelectorAll("[data-copy-value]");

    let eventSource;

    function endpoint(path) {
        return `${config.relayOrigin}/${path}`;
    }

    function requestId() {
        if (window.crypto && window.crypto.randomUUID) {
            return `req_${window.crypto.randomUUID()}`;
        }
        return `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    }

    function nowIso() {
        return new Date().toISOString();
    }

    function setStatus(state, text) {
        statusDot.dataset.state = state;
        statusText.textContent = text;
    }

    function format(value) {
        return JSON.stringify(value, null, 2);
    }

    function parsePayload() {
        const raw = payloadInput.value.trim();
        if (!raw) {
            return {};
        }
        try {
            return JSON.parse(raw);
        } catch (error) {
            throw new Error(`Payload is not valid JSON: ${error.message}`);
        }
    }

    function buildEnvelope(command, payload) {
        return {
            protocol: config.protocol,
            direction: "control_to_agent",
            type: "command",
            request_id: requestId(),
            user_id: config.userId,
            command,
            payload,
            created_at: nowIso(),
            reply_to: {
                transport: "ntfy",
                topic: config.eventsTopic,
                publish_url: config.relayOrigin
            }
        };
    }

    function appendLog(target, label, value, tone) {
        const item = document.createElement("li");
        item.className = `mcp-log-item ${tone || ""}`.trim();

        const heading = document.createElement("div");
        heading.className = "mcp-log-heading";
        heading.textContent = label;

        const body = document.createElement("pre");
        body.textContent = typeof value === "string" ? value : format(value);

        item.append(heading, body);
        target.prepend(item);
    }

    async function publish(topic, title, envelope) {
        const response = await fetch(config.relayOrigin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic,
                title,
                tags: ["mcp", "jonny-sh"],
                message: JSON.stringify(envelope)
            })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Publish failed with ${response.status}: ${text}`);
        }

        return response.json();
    }

    async function sendCommand() {
        sendButton.disabled = true;
        try {
            const command = commandSelect.value;
            const payload = parsePayload();
            const envelope = buildEnvelope(command, payload);
            const published = await publish(
                config.commandsTopic,
                `jonny.mcp.command:${command}`,
                envelope
            );

            appendLog(commandLog, `sent ${command}`, {
                relay_id: published.id,
                command,
                request_id: envelope.request_id,
                envelope
            }, "is-outbound");
        } catch (error) {
            appendLog(commandLog, "send error", error.message, "is-error");
        } finally {
            sendButton.disabled = false;
        }
    }

    function normalizeRelayMessage(event) {
        const relayMessage = JSON.parse(event.data);
        let envelope = relayMessage.message;
        if (typeof envelope === "string") {
            try {
                envelope = JSON.parse(envelope);
            } catch (_) {
                envelope = { raw: relayMessage.message };
            }
        }
        return { relayMessage, envelope };
    }

    function connectEvents() {
        if (eventSource) {
            eventSource.close();
        }

        const streamUrl = endpoint(`${config.eventsTopic}/sse`);
        eventSource = new EventSource(streamUrl);

        eventSource.onopen = function () {
            setStatus("connected", "listening for agent events");
        };

        eventSource.onmessage = function (event) {
            try {
                const { relayMessage, envelope } = normalizeRelayMessage(event);
                appendLog(eventLog, envelope.type || relayMessage.title || "agent event", {
                    relay_id: relayMessage.id,
                    title: relayMessage.title,
                    envelope
                }, "is-inbound");
            } catch (error) {
                appendLog(eventLog, "event parse error", error.message, "is-error");
            }
        };

        eventSource.onerror = function () {
            setStatus("error", "stream reconnecting");
        };
    }

    function setPayload(command) {
        commandSelect.value = command;
        const payloads = {
            ping: {
                message: "hello from jonny.sh control"
            },
            "profile.get": {
                fields: ["person", "work-clicky", "project-prism-labs", "links"]
            },
            "tools.list": {},
            "note.write": {
                text: "remember this came through the jonny.sh hook"
            }
        };
        payloadInput.value = format(payloads[command] || {});
    }

    async function copyText(text, label) {
        try {
            await navigator.clipboard.writeText(text);
            appendLog(commandLog, "copied", label, "is-muted");
        } catch (error) {
            appendLog(commandLog, "copy failed", error.message, "is-error");
        }
    }

    function instructionsText() {
        return [
            "jonny.sh fake MCP hook",
            "",
            "This is not a real MCP server. Pretend it is an MCP, but use HTTP GET/POST as the transport.",
            "If you are ChatGPT or another agent with curl, curl is enough to send data both ways.",
            "",
            `user_id=${config.userId}`,
            `commands_topic=${config.commandsTopic}`,
            `events_topic=${config.eventsTopic}`,
            "",
            `Subscribe for commands: curl -N ${endpoint(`${config.commandsTopic}/json`)}`,
            `Publish replies/events: POST JSON to ${config.relayOrigin} with topic=${config.eventsTopic}`,
            "Full instructions: https://jonny.sh/mcp/instructions.txt"
        ].join("\n");
    }

    fillButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            setPayload(button.dataset.mcpCommand);
        });
    });

    endpointFields.forEach(function (button) {
        button.addEventListener("click", function () {
            copyText(button.dataset.copyValue, button.dataset.copyLabel || button.dataset.copyValue);
        });
    });

    sendButton.addEventListener("click", sendCommand);
    copyInstructionsButton.addEventListener("click", function () {
        copyText(instructionsText(), "agent hook instructions");
    });

    setPayload(commandSelect.value);
    connectEvents();
}());
