# jonny.sh

Personal site for Jonathan Solomon. Plain static HTML/CSS/JS — no build step.
Deployed to <https://jonny.sh> via GitHub Actions (`.github/workflows/publish.yml`)
on every push to `master`.

## Structure
- `index.html` — home (intro, About depth-slider, "Stuff I'm proud of")
- `about/`, `now/`, `blog/` — pages
- `static/css/base.css` — all styles
- `static/js/` — greeting rotator, About depth slider, and the **∞ vault**

## The ∞ vault (secret "full story")
Drag the About slider to **"I have time..."** and an `∞` appears. Hover it (🔒),
click it, solve the riddle, and the encrypted long-form story is decrypted in the
browser. Files:
- `static/js/vault-crypto.js` — the cipher (obfuscation, not real crypto)
- `static/js/vault-data.js` — the encrypted blob + riddle (NO plaintext, NO answer)
- `static/js/infinity.js` — the gate UI

**To change the secret text or riddle:** put your text in a local file (e.g.
`vault-plaintext.txt`, which is git-ignored) and run:
```bash
./scripts/encrypt-vault.sh vault-plaintext.txt "make something people want"
```
That regenerates `vault-data.js`. Commit only that file. The current answer is
the four-word YC motto.

## Branches
- `master` — live site
- `stable` — backup of the previous Next.js site
