# Product teardown: Hudl Assist (human-in-the-loop tagging as a service)

**Question this teardown answers:** what does a sports-video business that puts people in the tagging loop look like, what does that cost in speed, and what can TouchlineAI take from it? A short reference pattern from Google Photos (correcting AI face groups) is included at the end.

## Method and limits (read first)
- **Desk research from public pages**, 10 Oct 2026, from search-result summaries. **The primary pages could not be opened** from the research environment, so wording is as summarised and must be re-checked.
- **No hands-on testing.** Pricing, youth eligibility and the error-handling process were [Not found].
- Labels: **[Source]** stated on a linked page; **[Inference]** my reasoning; **[Not found]** I looked and did not find it, which is not the same as "it does not exist".

## 1. Snapshot
- **Hudl Assist** is a paid tagging service. Hudl describes "a combination of professional human analysts and, in some sports, advanced AI technology to tag every key moment" [Source: [Hudl Assist FAQ](https://www.hudl.com/products/assist/faq)].
- Customers supply **game details** such as jersey colours and which athletes played, which helps the tagging team. The service produces **automatic athlete playlists** and **highlight reels** [Source: same FAQ].
- Hudl says its analysts tag stats "around the clock" so coaches focus on their program [Source: [Hudl Assist (baseball)](https://www.hudl.com/products/assist/baseball)]. For baseball it clips film by each pitch and syncs data to video [same].
- **Turnaround** is quoted as about **24 hours** in a junior-hockey club's announcement and a high-school football article. A reseller listing claims often within hours, which is less authoritative [Source: [Connecticut Chiefs announcement](https://ctchiefshockey.com/connecticut-chiefs-partner-with-hudl-to-elevate-player-development-and-exposure/)].
- **Hudl Focus** cameras record, clip and upload, and the indoor model livestreams. The summarised pages describe capture, not player identification [Source: [Hudl Focus Indoor](https://www.hudl.com/products/focus/indoor)].

## 2. What the business model tells us (Inference)
Hudl treats **accuracy as a staffed service**. Instead of asking the coach to correct a machine, it hires analysts and delivers tags later. This is human-in-the-loop at a different place: **before delivery, done by someone else, on a clock**.

```
Coach uploads game + supplies roster details
   ─► Analysts (plus AI in some sports) tag the moments
   ─► ~24h later: tagged clips, athlete playlists, highlight reels
```

## 3. What works (Inference)
- **Accuracy by design.** A person looks at every moment before the customer does. That is the same principle as TouchlineAI's coach review, just outsourced.
- **Roster input is expected.** Customers supply which athletes played and jersey colours. Identity depends on a human-supplied roster here too, so TouchlineAI's roster-confirmation step is normal practice.
- **Output matches the ask.** Athlete playlists and highlight reels are the personalised artifact players and families want.

## 4. Trade-offs and gaps
- **Latency is the price.** About a day. For youth families the Saturday-game, Sunday-evening rhythm may tolerate that, which links to the notification-timing question [Inference].
- **Cost and eligibility.** Pricing and whether youth or recreational teams can order the service were [Not found].
- **Error handling is undocumented in what I saw.** I found no description of what happens when a tag is wrong, or who is accountable [Not found].
- **Scale limits.** A staffed model grows with headcount. A coach-in-the-loop model grows with coach time, which is why TouchlineAI measures review burden [Inference].

## 5. Lessons for TouchlineAI

| Hudl Assist | TouchlineAI | Takeaway |
|---|---|---|
| Analysts verify, ~24h | Coach verifies, minutes | Fast, but depends on a volunteer coach's time. Track abandonment (PRD failure mode 2) |
| Roster details supplied by customer | Roster and consent confirmed on Setup | Keep it. Consent and delivery gates are the added safety layer |
| Highlight reels per athlete | Reels per child, honest zero state | Make the zero state a feature, not an apology |
| Quoted turnaround | No turnaround promised | If review takes a coach 5 minutes, "reels by Sunday evening" is a concrete, testable promise |

## 6. Reference pattern: correcting AI face groups in Google Photos
Not a sports product, but the closest everyday example of people correcting machine identity labels. From Google's help page and secondary summaries (the primary page was not opened):
- A wrong photo can be **removed from a face group**, and a **name label can be removed or changed** [Source: [Set up & manage your face groups](https://support.google.com/photos/answer/6128838)].
- The product asks users to confirm **merge suggestions** with **Same / Different / Not sure**, and merges cannot be undone [Source: summaries of the help page and [Android Police](https://www.androidpolice.com/2019/04/26/google-photos-has-been-asking-users-to-help-improve-its-facial-recognition-grouping/)].
- Removed photos may later reappear in a more accurate group, and availability varies by region [Source: help page summaries].

**Takeaways (Inference):**
1. A **"Not sure"** answer is a legitimate third option. TouchlineAI's closest equivalent is *Remove* with the reason "Unidentifiable". Worth testing whether a separate "Can't tell" action reduces forced guesses.
2. **Irreversible actions need to be labelled.** TouchlineAI's review is reversible until publish; after publish it locks. Make that boundary visible before the coach hits Approve.
3. **Corrections should teach the system.** Google's removals feed a better grouping; TouchlineAI's coach corrections should become labelled training data (see the AI-evaluation plan).

## Hands-on to-do before publishing
- [ ] Re-open each [Source] link and verify the quoted wording.
- [ ] Ask Hudl (or read pricing) whether youth or rec teams can order Assist, and what the correction process is.
- [ ] Try the Google Photos flow on a test account and screenshot the "Same / Different / Not sure" step.
- [ ] Update sections 3-6 with what you observe.

## Sources
- [Hudl Assist FAQ](https://www.hudl.com/products/assist/faq)
- [Hudl Assist (baseball)](https://www.hudl.com/products/assist/baseball)
- [Hudl blog: free your assistants from tagging duties](https://www.hudl.com/blog/save-the-staff-free-your-assistants-from-tagging-duties-with-assist)
- [Hudl Focus Indoor](https://www.hudl.com/products/focus/indoor)
- [Connecticut Chiefs partner with Hudl](https://ctchiefshockey.com/connecticut-chiefs-partner-with-hudl-to-elevate-player-development-and-exposure/)
- [Google Photos: set up & manage your face groups](https://support.google.com/photos/answer/6128838)
- [Android Police: Google Photos asks users to help improve face grouping](https://www.androidpolice.com/2019/04/26/google-photos-has-been-asking-users-to-help-improve-its-facial-recognition-grouping/)
