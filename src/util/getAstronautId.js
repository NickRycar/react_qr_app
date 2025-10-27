function getAstronautId() {
  let AstronautId = Math.floor(Math.random() * 999999);
  return AstronautId;
}

export default getAstronautId;