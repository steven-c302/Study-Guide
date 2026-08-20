# Arrays Hashing

<!-- Entries go below. Format:
## [Problem Name] — [Sub-pattern]
**Trigger:** what in the problem statement signals this pattern
**Key insight:** the one idea that unlocks it
**Approach:** 2-3 line summary, not full code
**Complexity:** O(?) time / O(?) space
**Gotchas:** edge cases you missed / mistake you made
-->

## Max Consecutive Ones — Running Counter / Streak Reset
**Trigger:** "max consecutive [X]'s in the array" — counting the longest streak that resets whenever a condition breaks.
**Key insight:** don't store the streak itself — track a running counter that increments while the condition holds and resets to 0 when it breaks, and separately track the max-so-far. No need for extra data structures.
**Approach:** single pass; if `nums[i] == 1` increment counter and compare to highest, else reset counter to 0.
**Complexity:** O(n) time / O(1) space
**Gotchas:** `counter >= highest` vs `counter > highest` behave identically here since counter only ever increases by 1 at a time — can't skip past highest without equaling it first. `>` is the more conventional choice. Could also write it as `highest = max(highest, counter)` to skip the if/else.
