
const anchors =
  ["home", "hikmah1", "undangan", "tentang",
  "kisah1", "kisah2", "kisah3", "info", "doa", "goresan", "hadits", "rsvp"]

const animationRegister = (function() {

  let nodeList = []

  return {
    register: function(elem, animationName) {
      nodeList.push({
        node: elem,
        animationName: animationName
      })
    },
    clear: function() {
      while(nodeList.length) {
        let { node, animationName } = nodeList.pop()
        node.classList.remove('animated', animationName)
      }
    },
    fadeAll: function() {
      for(i in nodeList) {
        let { node, animationName } = nodeList[i]
        node.classList.remove(animationName)
        node.classList.add('fadeOut')
        nodeList[i].animationName = 'fadeOut'
      }
    }
  }
}) ()

function handleOnLeave(origin, destination, direction)
{
  // --- background change ---
  // topleft+bottomright: 0, 1, 2, 7, 8, 9, 10
  // bottom: 3, 4, 5, 6, 11

  let divBg = document.getElementById('bg-placeholder')
  let divBg2 = document.getElementById('bg-placeholder2')

  console.log(origin.index + ' ' + destination.index + ' ' + direction)
  animationRegister.fadeAll()

  let bg = [0, 1, 2, 7, 8, 9, 10];

  if(bg.indexOf(origin.index) != -1 && bg.indexOf(destination.index) == -1)
  {
    divBg.classList.add('bg-two')
    divBg2.classList.add('bg2-two')
  }

  if(bg.indexOf(origin.index) == -1 && bg.indexOf(destination.index) != -1) {
    divBg.classList.remove('bg-two')
    divBg2.classList.remove('bg2-two')
  }

  if(destination.anchor == 'rsvp') {
    divBg2.classList.add('bg2-three')
  }

  if(origin.anchor == 'rsvp') {
    divBg2.classList.remove('bg2-three')
  }

  // --- section 0 (home) ---

  if(origin.index == 0) {
    let img = document.getElementById('img-za')
    if( img.classList.contains('img-seen') )
      img.classList.remove('img-seen')
  }

  // clear previous animation registered with animateCSS
  // (so that it can reload when the section is re-visited)
  animationRegister.clear()

  if(destination.anchor == 'tentang') {
    let el1 = destination.item.querySelector('.load-1')
    let el2 = destination.item.querySelector('.load-2')
    el1.style.animationDelay= '500ms'
    el2.style.animationDelay= '1200ms'
    animateCSSon(el1, 'fadeIn')
    animateCSSon(el2, 'fadeIn')
  }

  if(destination.anchor.indexOf('kisah') != -1) {
    let delay = 500
    for(let i = 1, nodes = destination.item.querySelectorAll('.load-'+i);
        nodes.length;
        ++i, nodes = destination.item.querySelectorAll('.load-'+i)) {
        delay += 500
        for(node of nodes) {
          node.style.animationDelay = delay+'ms'
          animateCSSon(node, 'fadeIn')
        }
      }
  }

  if(destination.anchor == 'undangan')
  {
    let delay = 200
    let animations = ['fadeIn', 'zoomIn', 'zoomIn', 'zoomIn',
                      'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn']

    for(let i = 1, node = document.getElementById('undangan-'+i);
            i <= 8;++i, node = document.getElementById('undangan-'+i))
    {
      node.style.animationDelay = delay+'ms'
      delay += 600
      animateCSSon(node, animations[i-1])
    }
  }

  if(destination.anchor == 'info')
  {

    let animations = ['zoomIn', 'fadeIn', 'fadeIn', 'fadeIn']
    let delays = [200, 1000, 500, 500]
    let delay = 0

    for(let i = 1, node = destination.item.querySelector('.load-'+i);
        node;++i, node = destination.item.querySelector('.load-'+i)) {

        delay += delays[i-1]
        if(i==1) node.style.animationDuration='1200ms'
        node.style.animationDelay = delay+'ms'
        animateCSSon(node, animations[i-1])
    }
  }

  if(destination.anchor == 'doa' || destination.anchor == 'hadits')
  {
    let header = destination.item.querySelector('h2')
    header.style.animationDuration = '600ms'
    header.style.animationDelay = '300ms'
    animateCSSon(header, 'fadeIn')
    destination.item.querySelectorAll('p').forEach( (p) => {
      p.style.animationDelay = '1000ms'
      animateCSSon(p, 'fadeIn')
    })
  }
}

function handleAfterLoad(origin, destination, direction)
{

  if(destination.index == 0) {
    let img = document.getElementById('img-za')
    img.classList.add('img-seen')
  }

  if(destination.anchor == 'hikmah1') {
    animateCSS('#arrum', 'fadeIn')
  }

  // if(destination.anchor == 'rsvp' || origin.anchor == 'rsvp') {
  //   fullpage_api.reBuild()
  // }


  // if(destination.anchor == 'storyline') {
  //   fullpage_api.reBuild()
  // }
}

function animateCSS(selector, animationName, callback) {
  const node = document.querySelector(selector)
  return animateCSSon(node, animationName, callback)
}

function animateCSSon(node, animationName, callback) {
    node.classList.add('animated', animationName)
    animationRegister.register(node, animationName)
}

// countdown section
// const weddingTime = 1561251600;
// let now = (new Date()).getTime()
//
// let timerId = countdown(function (ts) {
//   // console.log(ts)
//   const units = ['weeks', 'days', 'hours', 'minutes', 'seconds']
//   const labels = ['minggu', 'hari', 'jam', 'menit', 'detik']
//
//   function duaDigit(chr) {
//       if(chr.toString().length < 2)
//         return "0" + chr.toString();
//       else
//         return chr.toString()
//   }
//
//   for(let i = 0;i < units.length;++i)
//   {
//       document.getElementById(units[i]).innerHTML = duaDigit(ts[units[i]])
//   }
//
// }, weddingTime*1000, countdown.WEEKS | countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS)

// Listener for form radio change
function handleAttendanceChange(e) {
    var list = document.querySelectorAll('.will-attend input')
    if(document.getElementById('rsvp-1-1').checked) {
      for(var i = 0, el = list[i]; i < list.length ;++i, el=list[i])
      {
        if(el.hasAttribute('disabled'))
          el.removeAttribute('disabled')
      }
    } else {
      for(var i = 0, el = list[i]; i < list.length ;++i, el=list[i])
      {
        el.setAttribute('disabled', '')
      }
    }
}

// document.getElementById('rsvp-1-1').addEventListener('change', handleAttendanceChange)
// document.getElementById('rsvp-1-2').addEventListener('change', handleAttendanceChange)

fetch("https://script.google.com/macros/s/AKfycbz3sLK-v5T3-Cs_e4lmMY8Kz7VA3nYF1zzEi-zMHITQ5A9w6oA/exec")
.then(resp => resp.json())
.then(data => {
  var div = document.getElementById('guestbook')
  var messagesDiv = div.getElementsByClassName('container-guestbook')[0]

  var text = ""
  for(var i in data) {
    if(i == 1) continue;
    text += "<h5>" + data[i].nama
    if(data[i].akanHadir) {
      text += " <span class='badge badge-success'>✓ Hadir</span>"
    }
    text += "</h5>\n"
    text += "<p>" + data[i].words + "</p><hr/>\n"
  }

  console.log(messagesDiv)
  messagesDiv.innerHTML = text
  fullpage_api.reBuild()
  div.style.display = 'block'
})
// document.forms[0].elements
// document.getElementById('img-za').classList.add('img-seen');
// setTimeout(() => {document.getElementById('img-za').classList.add('img-seen');}, 1000)

// fetch("http://worldtimeapi.org/api/ip", {mode: 'no-cors'}).then(resp => resp.json())
//   .then(obj => obj.unixtime)
//   .then(
//     function (now) {
//       console.log(now)
//
//       let start = now
//       let timer = setInterval(function() {
//         let ts = countdown(start*1000, weddingTime*1000, ~countdown.MILLISECONDS)
//         --start
//         document.getElementById("timer").innerHTML = ts.toHTML()
//       }, 1000)
//   })
//   .catch(function(err) {
//     console.warn(err)
//   })
