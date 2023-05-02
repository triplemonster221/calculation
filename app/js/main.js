document.addEventListener('DOMContentLoaded', function() {
   

  //поверка на выбранный элемент 

  let calc = document.querySelector('.bf_calculation-contens');
  let input = document.querySelectorAll('input[type="radio"]');
  let checkoutwrapper = document.querySelector('.checkout-info-template');
  let checkoutBtn = document.querySelector('.checkout-btn');
  params = {
    cabin: false,
    glass: false,
    color: false,
    furnityr: false,
    handles: false,
    dostavka: false,
    montazh: false,
    height: false,
    width: false
  }

  rezult = [

  ]
  
  calc.addEventListener('click', checedElement);
  checkoutBtn.addEventListener('click', checkout);

  

  function checedElement(e){
    //e.preventDefault()

    // при выборе инпута, добавляем к заголовку класс 
    function titleCheck(){
      let parent = e.target.closest('.bf_calc-row');
      let title = parent.querySelector('.bf_calc__title');
      title.classList.add('title-check');
      title.style.color = '#000000'
    }

    // перебор инпутов

          // выбор душевой кабины, и перекидка на 2 таб
    if(e.target.dataset.cabin) {
      let price = Number(e.target.dataset.price);
      let titleCabune = e.target.nextElementSibling;
      let paramsContent = document.querySelector('.params-conten .bf_calc-content');
      let paramsInfo = document.querySelector('.params-conten-info');
      params.cabin = titleCabune.innerHTML;


      rezult.push(price);


      let contents = document.querySelectorAll('.bf_calculation-content');
      let btn = document.querySelectorAll('.bf_calculation-tab');

      contents.forEach(el => {
        el.classList.remove('bf_active');
      })

      btn.forEach(el => {
        el.classList.remove('bf_active');
      })

      for(x = 0;x < contents.length;x++) {
        contents[1].classList.add('bf_active')
      }

      for(x = 0;x < contents.length;x++) {
        btn[1].classList.add('bf_active')
      }
      paramsInfo.style.display = 'none';
      paramsContent.style.display = 'flex';
    }



    //выбор толщины стекла
    if(e.target.dataset.glass) {
      params.glass = e.target.nextElementSibling.innerHTML;
      rezult.push(e.target.value);
      titleCheck();

      
    }

    if(e.target.dataset.color) {
      params.color = e.target.nextElementSibling.innerHTML;
      titleCheck();
      rezult.push(e.target.value);
    }

    if(e.target.dataset.furnitur) {
      params.furnityr = e.target.nextElementSibling.innerHTML;
      rezult.push(e.target.value);
      titleCheck();
    }

    if(e.target.dataset.handles) {
      params.handles = e.target.nextElementSibling.style.backgroundImage;
      //rezult.push(e.target.value);
      titleCheck();
    }

    if(e.target.dataset.dostavka) {
      params.dostavka = !params.dostavka;
      
    }

    if(e.target.dataset.montazh) {
      params.montazh = !params.montazh;
      
    }

    if(e.target.dataset.height) {
      let element =  e.target.nextElementSibling;
      let min = Number(element.querySelector('.min').dataset.min);
      let max = Number(element.querySelector('.max').dataset.max);
      
      e.target.addEventListener('blur', function(){
          if(e.target.value < min) {
            e.target.value = min
          }

          if(e.target.value > max) {
            e.target.value = max
          }

          params.height = e.target.value
          
      })

      params.height = e.target.value
      titleCheck();
    }

    if(e.target.dataset.width) {
      let element =  e.target.nextElementSibling;
      let min = Number(element.querySelector('.min').dataset.min);
      let max = Number(element.querySelector('.max').dataset.max);
      
      e.target.addEventListener('blur', function(){
          if(e.target.value < min) {
            e.target.value = min
          }

          if(e.target.value > max) {
            e.target.value = max
          }

          params.width = e.target.value
      })

      params.width = e.target.value
      titleCheck();
    }

    console.log(params)

  }

  //нажатие на кнопку расчитать 

  function checkout(){
    let contents = document.querySelectorAll('.bf_calculation-content');
    let btn = document.querySelectorAll('.bf_calculation-tab');
    let checkoutMessage = document.querySelector('.checkout-info-message');

    //проверка на заполнение обьекта данными
    if(params.glass && params.color &&  params.furnityr &&  params.handles &&  params.height && params.width) {

      contents.forEach(el => {
        el.classList.remove('bf_active');
      })
  
      btn.forEach(el => {
        el.classList.remove('bf_active');
      })
  
      for(x = 0;x < contents.length;x++) {
        contents[2].classList.add('bf_active')
      }
  
      for(x = 0;x < contents.length;x++) {
        btn[2].classList.add('bf_active')
      }
      checkoutMessage.remove();
      addTemplate();
      

    } else { //если каких то данных нет то маркировать заголовок
      let title = document.querySelectorAll('.bf_calc__title ');

      title.forEach(el => {
        console.log(el);
        if(!el.classList.contains('title-check')) {
          el.style.color="red";
        }else {
          
        }
      })
    }
   
    
  }


  function addTemplate(){

    let template = 
    `
    <div class="checkout-row"> 
      <div class="checkout-row-left">Душевая кабина</div>
      <div class="checkout-row-right">${params.cabin}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Толщина стекла:</div>
      <div class="checkout-row-right">${params.glass}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Цвет стекла:</div>
      <div class="checkout-row-right">${params.color}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Цвет фурнитуры:</div>
      <div class="checkout-row-right">${params.furnityr}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Тип ручки:</div>
      <div class="checkout-row-right"> <img src="img/knob1.jpg" alt=""/></div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Доставка:</div>
      <div class="checkout-row-right">${params.dostavka}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Монтаж:</div>
      <div class="checkout-row-right">${params.montazh}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Высота (H):</div>
      <div class="checkout-row-right">${params.height}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Длина (A):</div>
      <div class="checkout-row-right">${params.width}</div>
    </div>
    <div class="checkout-row"> 
      <div class="checkout-row-left">Итого</div>
      <div class="checkout-row-right">12 000 руб.</div>
    </div>
    `;


    checkoutwrapper.innerHTML = template;
  }
 

//---------------STOP ANIMATION============================

function burger(){
  let tabWrapper = document.querySelector('.bf_calculation_desctop-tabs');
  let submenuList = document.querySelector('.bf_calculation_desctop-tabs ul');

  tabWrapper.addEventListener('click', function(){
    tabWrapper.classList.toggle('active')
    submenuList.classList.toggle('active')
  })
}

burger();


// ============================tabs============================

  function tabs(headerSelector, tabSelector, contentSelector, activeClass) {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector)

    function hdieTabContent(){
     
        content.forEach(elem => {
          elem.classList.remove(activeClass);
        })

        tab.forEach(elem => {
            elem.classList.remove(activeClass);
        })
     
       
    }

    function showTabContent(i = 0) {
   
        content[i].classList.add(activeClass);
        tab[i].classList.add(activeClass);
    
        
    }

    
      hdieTabContent();
      showTabContent();
    
    header.addEventListener('click', (e) => {
        const target = e.target;
        if(target.classList.contains(tabSelector.replace(/\./, ''))){
            tab.forEach((item, i) => {
                if(target == item) {
                    console.log(i);
                    hdieTabContent();
                    showTabContent(i);
                }
            })
        }
    })

  }

  //--проверка на существование табов 

  let directionWrapper = document.querySelector('.bf_calculation-inner');
  if(directionWrapper){
    tabs('.bf_calculation-tabs', '.bf_calculation-tab','.bf_calculation-content','bf_active');
    tabs('.bf_calculation_desctop-tabs', '.bf_calculation_desctop-tab','.bf_calculation-content','bf_active');
  }

// ============================STOP tabs============================


// ============================STOP DATE============================

  // let yearLend = document.querySelector('.year');
  // var d = new Date();

  // yearLend.innerHTML = d.getFullYear() + ' ';

// ============================STOP DATE============================



})
