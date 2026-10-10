# Product teardown: Veo (AI sports camera and editor)

**Question this teardown answers:** when an AI-tagged sports moment is attached to the wrong player, how does a mass-market sports-video product let a person fix it? What can TouchlineAI learn?

## Method and limits (read first)
- **Desk research from public pages**, 10 Oct 2026. I read search-result summaries of Veo's own articles and help-centre pages. **The primary pages could not be opened** from the research environment, so quotes are as summarised and must be re-checked.
- **No hands-on testing.** Nothing below describes the product as I used it. The "hands-on to-do" at the end lists what to verify in a free trial or demo before publishing.
- Labels: **[Source]** stated on a Veo page (linked), **[Inference]** my reasoning, **[Not found]** I looked and did not find it, which is *not* the same as "it does not exist".
- Veo's product and docs change. This is a snapshot.

## 1. Snapshot
- Veo sells an AI-powered sports camera, with a web **Veo Editor** and **Analytics Studio** [Source: [Veo Editor](https://veo.co/product/veo-editor)].
- Its AI tags key events such as goals and shots on goal, and the Editor marks AI-created tags with an **"AI" symbol** [Source: [Veo's AI now fully tags your game](https://www.veo.co/article/veos-ai-now-fully-tags-your-game)].
- **Player Spotlight / Player Moments** use AI **shirt-number detection** to capture a player's key moments, with adjustable sensitivity (distance to ball, time of possession, footage before and after each play) [Source: [Player Spotlight](https://shop.veo.co/pages/what-is-veo-player-spotlight)].
- Veo notes that many factors, such as lighting and weather, affect Player Moments results [Source: [Player Moments overview](https://support.veo.com/hc/en-us/articles/27698176364817)].

## 2. Who it seems to serve (Inference)
Coaches and analysts who want event tags, clips and stats; players who want their own moments. The documented editing tools assume an *editor role*. A guardian-delivery gate is not part of what the pages describe [Not found].

## 3. The flow as documented

```
Record match ─► AI tags key events (marked "AI") ─► Coach opens Veo Editor
   ─► adds or edits events manually ─► assigns each event to a player ("Who did it?")
   ─► player stats table fills in Analytics Studio
```
Players are linked to events such as goal scorer or shooter, and you can also credit assists [Source: [Veo AI tagging article](https://www.veo.co/article/veos-ai-now-fully-tags-your-game), [About Match Events](https://support.veo.com/hc/en-us/articles/24763703494161-About-Match-Events-in-the-Veo-Editor)].

## 4. The wrong-player fix, step by step
[Source: [How to fix an event assigned to the wrong player](https://support.veo.com/hc/en-us/articles/49504411443857-How-to-fix-an-event-assigned-to-the-wrong-player)]

1. Open the **Events** panel from the side menu.
2. Find the event with the wrong player and open it with the arrow icon.
3. Click the **jersey icon** and choose **Remove jersey**, which clears the current assignment.
4. Click **Who did it?**
5. Pick the correct player.

Conditions stated: you must be a team **Editor or admin**; the article covers **soccer/football** recordings. If the correct player is not in the list, they probably have no jersey number in your **Lineup**. Use **Assign jersey numbers** in Lineup, then return to the event.

## 5. What works (Inference, with reasons)
- **Honest labelling.** The "AI" symbol tells a person which tags were machine-made. That is the same idea as TouchlineAI's "Simulated AI" chip, and it supports trust.
- **Roster-first design.** The assignment depends on a Lineup with jersey numbers. A person-maintained roster is the anchor for identity, which matches TouchlineAI's "confirm the roster before detection" step.
- **A short, explicit correction path.** Five steps, one place (the event), no hunting.
- **Tuneable capture.** Sensitivity controls give coaches a lever when moments are missed or too many.

## 6. Friction and gaps (Inference unless stated)
- **Correction is after the fact.** The documented fix works on events that already exist. A pre-share review gate is [Not found] in the pages summarised.
- **Two-step reassign.** "Remove jersey" then "Who did it?" makes the coach clear the old answer before choosing the new one. It is safe, but it adds a step and an interim "no player" state.
- **Hidden prerequisite.** A missing player in the list is explained by a missing jersey number elsewhere (Lineup). A coach has to know to look there.
- **Soccer scope and role gating.** The article is scoped to soccer, and only Editors/admins can fix. Reasonable, but it narrows who can correct a mistake.
- **No evidence shown of accuracy.** The summarised pages give no accuracy numbers for tagging or shirt-number detection [Not found]. Troubleshooting points to lighting and weather instead.

## 7. Lessons for TouchlineAI

| Veo pattern | TouchlineAI position | Takeaway |
|---|---|---|
| "AI" symbol on machine tags | "Simulated AI" chip on every proposal | Keep it. Consider keeping the **origin** visible even after a coach confirms, so an audit can tell AI-proposed from coach-created |
| Fix after the fact, per event | Coach decides every clip **before** any parent sees it | The difference worth defending, but only as a **design stance**: I cannot claim Veo lacks a review step |
| Reassign = remove, then choose | Reassign in one dialog, with the evidence next to the choice | A one-step swap with a note is faster, as long as it logs the old and new child |
| Jersey numbers live in Lineup | Roster confirmed on Setup, with consent and recipients | Same anchor. TouchlineAI adds consent and delivery destination, which Veo's pages do not mention |
| Reason for misses: lighting, weather | Cause deliberately unclaimed | Do not blame conditions without data. Log the conditions per clip so causes can be learned |

## 8. Open questions to settle hands-on
1. Is there any preview or approval step before a clip or reel is shared with players or parents?
2. What does the "AI" symbol look like after a person edits the event? Does it persist?
3. When Player Moments misses or mis-assigns, what can a coach do besides adjusting sensitivity?
4. Does the Editor record who changed an assignment and when?
5. How are two players with the same number (for example, in different halves) handled?

## Hands-on to-do before publishing
- [ ] Open a Veo trial or demo and walk the Events panel and the wrong-player fix.
- [ ] Screenshot each step (your own screenshots, for your own analysis).
- [ ] Re-read every [Source] link and replace any paraphrase that drifted.
- [ ] Answer the five questions above and update sections 5-7.

## Sources
- [Veo Editor](https://veo.co/product/veo-editor)
- [Veo's AI now fully tags your game](https://www.veo.co/article/veos-ai-now-fully-tags-your-game)
- [Overview of Veo Player Moments](https://support.veo.com/hc/en-us/articles/27698176364817)
- [What is Veo Player Spotlight?](https://shop.veo.co/pages/what-is-veo-player-spotlight)
- [About Match Events in the Veo Editor](https://support.veo.com/hc/en-us/articles/24763703494161-About-Match-Events-in-the-Veo-Editor)
- [How to fix an event assigned to the wrong player](https://support.veo.com/hc/en-us/articles/49504411443857-How-to-fix-an-event-assigned-to-the-wrong-player)
- [How to create clips, tag players, and add comments in the Veo Editor](https://support.veo.com/hc/jp/articles/4454306853905)
