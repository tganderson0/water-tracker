import realm from "./realm";

// Todo: Make it so that on new days, the time created is at midnight, or 12:01 AM, rather than whatever time they opened the app

let getAllWater = () => {
  return realm.objects('Water');
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
  return realm.objects('Water').filtered("date = $1", _date)
}

let getToday = () => {
  let yesterdayTime = new Date()
  yesterdayTime.setTime(yesterdayTime.getDate() - 1)
  let temporary = realm.objects('Water').filtered("date > $0", yesterdayTime);
  if (!temporary.length){
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    realm.write(() => {
      const water = realm.create('Water', {
        date: today,
        current: 0,
        goal: 125,
      })
    })
    temporary = realm.objects('Water').filtered("date > $0", yesterdayTime);
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

export {
getAllWater,
addNewWater,
resetDatabase,
getWaterByDate,
getToday,
addWater,
findByGoal,
}