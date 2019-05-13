
const anchors = ["home", "hikmah1", "about", "hikmah2", "aza", "undangan", "info", "rsvp"]

function handleOnLeave(origin, destination, direction)
{
  let divBg = document.getElementById('bg-placeholder')
  let divBg2 = document.getElementById('bg-placeholder2')

  console.log(origin.index + ' ' + destination.index + ' ' + direction)

  if(origin.index < 2 && destination.index >= 2)
  {
    divBg.classList.add('bg-two')
    divBg2.classList.add('bg2-two')
    // divBg.classList.remove('bg-one')
  }

  if(origin.index >= 2 && destination.index < 2) {
    divBg.classList.remove('bg-two')
    divBg2.classList.remove('bg2-two')
  }
}
