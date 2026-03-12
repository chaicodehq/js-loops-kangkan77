/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  // I love RCB not hate dhoni and virat 
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  let stats = {};

  for (let i = 0; i < matches.length; i++) {
    let match = matches[i];
    let t1 = match.team1;
    let t2 = match.team2;

    if (stats[t1] === undefined) {
      stats[t1] = { team: t1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    }
    if (stats[t2] === undefined) {
      stats[t2] = { team: t2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    }

    stats[t1].played += 1;
    stats[t2].played += 1;

    if (match.result === "win") {
      let winner = match.winner;
      let loser;
      if (winner === t1) {
        loser = t2;
      } else {
        loser = t1;
      }

      stats[winner].won += 1;
      stats[winner].points += 2;
      stats[loser].lost += 1;
      
    } else if (match.result === "tie") {
      stats[t1].tied += 1;
      stats[t2].tied += 1;
      stats[t1].points += 1;
      stats[t2].points += 1;

    } else if (match.result === "no_result") {
      stats[t1].noResult += 1;
      stats[t2].noResult += 1;
      stats[t1].points += 1;
      stats[t2].points += 1;
    }
  }

  let table = Object.values(stats);

  
  table.sort(function(a, b) {
    if (a.points !== b.points) {
      return b.points - a.points; 
    }
    if (a.team < b.team) return -1;
    if (a.team > b.team) return 1;
    return 0;
  });

  return table;
}
