#!/usr/bin/env bash
# Regenerate static/js/vault-data.js from a LOCAL plaintext file.
#
#   ./scripts/encrypt-vault.sh ../my-secret-story.txt "make something people want" [seed]
#
# - The plaintext is read locally and NEVER written into the repo.
# - Uses macOS's built-in JavaScriptCore (osascript) and the exact same
#   vault-crypto.js the browser uses, so encrypt/decrypt always agree.
# - Edit RIDDLE / HINT below to change the unlock prompt.
set -euo pipefail
PLAINTEXT="${1:?usage: encrypt-vault.sh <plaintext-file> <answer> [seed]}"
ANSWER="${2:?provide the riddle answer (the decryption key)}"
SEED="${3:-$(od -An -N4 -tu4 /dev/urandom | tr -d ' ')}"

RIDDLE="Four words live over Y Combinator’s door — the ones Paul Graham tells every founder. Say them to come in."
HINT="lowercase, spaces optional · it’s a startup commandment, not a password you’d guess"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DRIVER="$(mktemp /tmp/vault-driver.XXXXXX.js)"
trap 'rm -f "$DRIVER"' EXIT
cat "$ROOT/static/js/vault-crypto.js" > "$DRIVER"
cat >> "$DRIVER" <<JS
ObjC.import('Foundation');
var __pt = ObjC.unwrap(\$.NSString.stringWithContentsOfFileEncodingError('$PLAINTEXT', \$.NSUTF8StringEncoding, \$()));
VaultCrypto.encrypt(__pt, '$ANSWER', $SEED);
JS
B64="$(osascript -l JavaScript "$DRIVER")"

cat > "$ROOT/static/js/vault-data.js" <<JS
/* vault-data.js — the encrypted "full, full, full story".
 * XOR-streamed with a key derived from the riddle answer + seed, then base64'd.
 * Cannot be read without solving the riddle. Plaintext is NEVER committed.
 * Regenerate with scripts/encrypt-vault.sh. Answer is not stored here. */
var VAULT = {
  seed: $SEED,
  riddle: "$RIDDLE",
  hint: "$HINT",
  data: "$B64"
};
JS
echo "✓ wrote static/js/vault-data.js (seed=$SEED, ${#B64} b64 chars)"
