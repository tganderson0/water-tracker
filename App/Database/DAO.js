import realm from "./realm";

// Todo: Make it so that on new days, the time created is at midnight, or 12:01 AM, rather than whatever time they opened the app

let getAllWater = () => {
  return realm.objects('Water');
}

let getPastWeek = () => {
  let weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 8)
  weekAgo.setHours(0, 0, 0, 0)

  return realm.objects('Water').filtered("date >= $0", weekAgo)
}

let addNewWater = (_current = 0, _goal = 125) => {
  realm.write(() => {
      const water = realm.create('Water', {
          date: new Date(),
          current:  _current,
          goal: _goal
      });
  });
}

let getWaterByDate = (_date) => {
  return realm.objects('Water').filtered("date = $0", _date)
}

let getStreak = () => {
  return realm.objects('Streak')[0]
}

let getToday = () => {
  let today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let temporary = realm.objects('Water').filtered("date = $0", today);
  if (!temporary.length){
    let settings = getSettings()[0];
    realm.write(() => {
      const water = realm.create('Water', {
        date: today,
        current: 0,
        goal: settings.goalAmount,
      })
      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)
      let resultYesterday = getWaterByDate(yesterday)
      let check = realm.objects('Streak')
      if (!check.length) realm.create('Streak', {
        currentStreak: 0,
      })
      let streak = realm.objects('Streak')[0]
      if (!resultYesterday.length || resultYesterday[0].current < resultYesterday[0].goal){
        streak.currentStreak = 0
      }
      else{
        streak.currentStreak += 1
      }
    })
    temporary = realm.objects('Water').filtered("date = $0", today);
  }
  return temporary;
}

let addWater = (water, amount) => {
  realm.write(() => {
    water.current += amount;
  });
}

let findByGoal = (_goal) => {
  return realm.objects('Water').filtered(`goal == ${_goal}`);
}

let resetDatabase = () => {
  realm.write(() => {
      realm.delete(getAllWater());
  })
}

let getSettings = () => {
  let result = realm.objects('Settings');
  realm.write(() => {
    if (!result.length){
        const newSettings = realm.create('Settings', {
        goalAmount: 125.0,
        preferredUnits: 'oz',
      })
      result = realm.objects('Settings');
    }
  })
  return result;
}

// let updateSettings = (goalAmount = )

let updateSettings = (goal, preferredUnits, standardDrinkSize) => {
  let result = realm.objects('Settings')[0];
  realm.write(() => {
    if (goal){
      result.goalAmount = goal;
      const todayGoal = getToday()[0];
      todayGoal.goal = goal;
    }
    if (preferredUnits) result.preferredUnits = preferredUnits;
    if (standardDrinkSize) result.standardDrinkSize = standardDrinkSize;
  })
}

export {
getAllWater,
addNewWater,
resetDatabase,
getWaterByDate,
getToday,
addWater,
findByGoal,
getSettings,
updateSettings,
getStreak,
getPastWeek,
}