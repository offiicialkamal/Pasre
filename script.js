const newDetailsRadio = document.querySelector('input[name="mode"][value="new"]');
const editDetailsRadio = document.querySelector('input[name="mode"][value="edit"]');
newDetailsRadio.click();
newDetailsRadio.addEventListener('change', function() {
    if (this.checked) {
        console.log("New Details mode selected");
        clearFormFields();
    }
});

editDetailsRadio.addEventListener('change', function() {
    if (this.checked) {
        console.log("Edit Details mode selected");
        populateFormFields();
    }
});

let SideElement = document.querySelector('.sidebar');
function showSideBar() {
  SideElement.classList.toggle('active');
}
function hideSideBar() {
  setTimeout(function() {
    SideElement.classList.remove('active');
  }, 2200);
}
function QuickhideSideBar(){
  SideElement.classList.remove('active');
}
document.querySelector('#tok').click();
function removeClass(){
var elements = document.querySelectorAll('.fullscreen');
elements.forEach(function(element) {
    element.classList.remove('fullscreen');
    element.classList.toggle('hide')
});
}
function openAccessTokenFile(){
 removeClass();
 const aos = document.querySelector('#headerEditor');
 let token = document.querySelector('#accessToken');
 token.classList.remove('hide');
 token.classList.toggle('fullscreen');
 hideSideBar();
 aos.innerHTML = 'Access Tokens';
}
function openThreadid(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let uid = document.querySelector('#threadid');
  uid.classList.remove('hide');
  uid.classList.add('fullscreen');
  hideSideBar();
  aos.innerHTML = 'Your Thread IDs';
}
function openPostLink(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let post = document.querySelector('#postLink');
  post.classList.remove('hide');
  post.classList.toggle('fullscreen');
  hideSideBar();
  aos.innerHTML = 'Your Post Links';
}
function openHater(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let hater = document.querySelector('#hatersname');
  hater.classList.remove('hide');
  hater.classList.toggle('fullscreen')
  hideSideBar();
  aos.innerHTML = 'Your Haters';
}
function openMessage(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let np = document.querySelector('#textareaInput');
  np.classList.remove('hide');
  np.classList.toggle('fullscreen');
  hideSideBar();
  aos.innerHTML = "Your Messages Or NP's";
}
function openTime(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let tim = document.querySelector('#time');
  tim.classList.remove('hide');
  tim.classList.toggle('fullscreen');
  hideSideBar();
  aos.innerHTML = 'Timer in seconds';
}

   // HANDEL THE SWIPE LEFT RIGHT FUNCNALITIY
    let startX;
    let currentIconIndex = 1;
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
function handleTouchMove(event) {
    if (!startX) return;
    const currentX = event.touches[0].clientX;
    const diffX = startX - currentX;
    const currentIndex = currentIconIndex;
    let newIndex;
    if (diffX > 50 && currentIndex !== 6) {
        //  (next)
        newIndex = currentIndex + 1;
    } else if (diffX < -50 && currentIndex !== 1) {
        // (previous)
        newIndex = currentIndex - 1;
    }
    const deltaY = Math.abs(event.touches[0].clientY - startY);
    if (deltaY > 20) {
        startX = null;
        return;
    }
    if (newIndex) {
        switchButton(newIndex);
        startX = null;
        event.preventDefault();
    }
}
    let startY;
    function handleTouchStart(event) {
         startX = event.touches[0].clientX;
         startY = event.touches[0].clientY;
        }
    const menuBar = document.querySelector('.menu-bar');
    const menuBarHeight = menuBar.offsetHeight;
    let lastScrollPosition = 0;

        window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > menuBarHeight) {
            //fix the menu bar
            menuBar.classList.add('fixed');
        } else {
            //unfix the menu bar
            menuBar.classList.remove('fixed');
        }
        lastScrollPosition = currentScrollPosition;
    });
// FOR BLUE ICON AND BLUE LINE CHANGE ON SCRALL
    const icons = document.querySelectorAll('.icon');
    const contentSections = document.querySelectorAll('.content');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const index = icon.getAttribute('data-index');
            toggleContent(index);
        });
    });

   function switchButton(index) {
        toggleContent(index);
    }
   function toggleContent(index) {
    const activeIcon = document.querySelector(`.icon[data-index="${index}"]`);
    const activeContent = document.getElementById(`content${index}`);
    if (activeIcon && activeContent) {
        icons.forEach(icon => icon.classList.remove('active'));
        contentSections.forEach(content => content.classList.remove('active'));
        activeIcon.classList.add('active');
        activeContent.classList.add('active');
        currentIconIndex = index;
              }
         }
    document.addEventListener('click', (event) => {
    const isInsideMenuBar = event.target.closest('.menu-bar');
    if (!isInsideMenuBar) {
        return; 
    }
    const clickedIcon = event.target.closest('.icon');
    if (clickedIcon) {
        const index = clickedIcon.getAttribute('data-index');
        toggleContent(index);
            }
       });
    
       
       // GET CONSOLE AND ASSING IT TO CINTENT2 TO DISPLAY IT FOR THE USERS
        const consoleElement = document.getElementById('consoleOutput');
        let lastPacketTime = 0; // TRACK TIME 
        function updateConsole(content) {
        const currentTime = new Date().getTime();
        // CALCULATE THE TIME BETWEEN NEW AnD OLD DATA
        const timeDiff = currentTime - lastPacketTime;
        if (timeDiff > 700) {
                consoleElement.innerHTML += '<br/><br/>';
            }
         // update the details on console
        consoleElement.innerHTML += content;
        lastPacketTime = currentTime;
        consoleElement.scrollTop = consoleElement.scrollHeight;
        }
        const socket = io.connect('https://' + document.domain + ':' + location.port);
        socket.on('console_output', function (data) {
            updateConsole(data);
        });
        socket.on('connect', function () {
            console.log('WebSocket Connected');
        });
        socket.on('disconnect', function () {
            console.log('WebSocket Disconnected');
        });
//document.getElementById("uploadedFile").addEventListener("change", function() {
//    document.getElementById("textareaInput").removeAttribute("required");
//    this.setAttribute("required", "required");
//});

//document.getElementById("textareaInput").addEventListener("input", function() {
  //  document.getElementById("uploadedFile").removeAttribute("required");
  //  this.setAttribute("required", "required");
//});
function clearFormFields() {
    try {
        document.getElementById('accessToken').value = '';
        document.getElementById('threadid').value = '';
        document.getElementById('postLink').value = '';
        document.getElementById('hatersname').value = '';
        document.getElementById('textareaInput').value = '';
        document.getElementById('time').value = ''; 
    } catch (error) {
        console.error('Error clearing form fields:', error.message);
    }
}
// AUTOFILL THE FORM WITH THE APROPRIATE DETAILS PROVIDED BY THE SERVER
function fillFormFields(data) {
    try {
        console.log('Data retrieved from the server:', data);
        document.getElementById('accessToken').value = data['accessToken.txt'] || '';
        document.getElementById('threadid').value = data['threadid.txt'] || '';
        document.getElementById('postLink').value = data['postLink.txt'] || '';
        document.getElementById('hatersname').value = data['hatersname.txt'] || '';
        document.getElementById('textareaInput').value = data['NP.txt'] || '';
        document.getElementById('time').value = data['time.txt'] || ''; 
    } catch (error) {
        console.error('Error filling form fields:', error.message);
    }
}
function populateFormFields() {
    try {
        fetch('/get_data') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                fillFormFields(data);
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error.message);
            });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};
