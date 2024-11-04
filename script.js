var currentHeight = 0 ;
var In_menulist = false ;
var list_opening = false ;

function pageload() {
    menuList();
    post_detect();
    menu_detect();
    up_detect();
    menu_content_detect()
}

function menuList(){ // 此function可以使滑鼠滑到menu按鈕時會延伸出更多list
    var menu_list = document.querySelectorAll(".menu-list");
    var menu_button = document.getElementById("menu-button");
    var buttonWidth = parseFloat(window.getComputedStyle(menu_button).width); //取得menu button 的寬
    var buttonHeight = parseFloat(window.getComputedStyle(menu_button).height); //取得menu button 的高
    
    menu_list.forEach(element => {
        var elementWidth = parseFloat(window.getComputedStyle(element).width);
        if (elementWidth < buttonWidth){
        element.style.width = buttonWidth; //設定每個list的寬和menu button一樣高
        
        }
        element.style.marginTop = parseInt(buttonHeight) + "px"; //設定list 的預設位置在menu底下 利用marginTop
        
       
    });
}


function menuList_ani(){ //將menu_List 打開
    var menu_list = document.getElementById("menu-list");
    menu_list.classList.add('show');
}

function re_menuList_ani(){ //將menu_List 收起
    var menu_list = document.getElementById("menu-list");
    menu_list.classList.remove('show');
}

function menu_detect(){ //偵測滑鼠
    var menu_area = document.getElementById("menu-button");
    var menu_button= document.getElementById("menu-button-area"); 
    menu_button.addEventListener("mouseover", menuList_ani ); 
    menu_area.addEventListener("mouseenter", menuList_ani);
    menu_button.addEventListener("mouseleave", re_menuList_ani);
    menu_area.addEventListener("mouseleave", re_menuList_ani);
}

function post_detect(){     // 偵測文章已經滑到哪裡 然後執行動畫
    window.addEventListener('scroll', () => {
        const col_distance_element = document.querySelectorAll(".post");
        const windowHeight = window.innerHeight; // 視窗的高度
        for (var i = 0 ; i < col_distance_element.length ; i++){
            const elementRect = col_distance_element[i].getBoundingClientRect(); //取得元素的位置
            const elementTop = Math.abs(elementRect.top); //取絕對值
            const threshold = 240; // 計算元素上方的像素數
            const pixelsAbove =  Math.abs(windowHeight - threshold);
            if (pixelsAbove > elementTop && col_distance_element[i].classList.contains("hide_right")){
                movein_animation(col_distance_element[i]);
                col_distance_element[i].classList.remove('hide_right');
                }
            else if (pixelsAbove > elementTop && col_distance_element[i].classList.contains("hide_left")){
                movein_animation(col_distance_element[i]);
                col_distance_element[i].classList.remove('hide_left');
                }

        }
    });
}
function movein_animation(element){ //淡入動畫
    let moveX = 50;
    let speed = 0.67 ;
    if (element.classList.contains("hide_right")){
        function right_animation(){
            if (moveX > 25 ){
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50-moveX)/50}`;
                moveX -= speed ;
                requestAnimationFrame(right_animation)
            }
            else if (moveX > 15 ){
                speed = 0.5 ;
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50-moveX)/50}`;
                moveX -= speed ;
                requestAnimationFrame(right_animation)
            }
            else if (moveX > 7 ){
                speed = 0.3;
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50-moveX)/50}`;
                moveX -= speed ;
                requestAnimationFrame(right_animation)
            }
            else if (moveX > 0 ){
                speed = 0.18;
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50-moveX)/50}`;
                moveX -= speed ;
                requestAnimationFrame(right_animation)
            }
    
        }
        right_animation()
    }
    else if(element.classList.contains("hide_left")){
        moveX *= -1 ;
        function left_animation(){
            if (-moveX > 25 ){
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50+moveX)/50}`;
                moveX += speed ;
                requestAnimationFrame(left_animation)
            }
            else if (-moveX > 15 ){
                speed = 0.5 ;
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50+moveX)/50}`;
                moveX += speed ;
                requestAnimationFrame(left_animation)
            }
            else if (-moveX > 7 ){
                speed = 0.3;
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50+moveX)/50}`;
                moveX += speed ;
                requestAnimationFrame(left_animation)
            }
            else if (-moveX > 0 ){
                speed = 0.18;
                element.style.transform = `translateX(${moveX}px)`;
                element.style.opacity = `${(50+moveX)/50}`;
                moveX += speed ;
                requestAnimationFrame(left_animation)
            }
    
        }
        left_animation()
    }
    
}

function up_detect(){
    const arrow = document.querySelector("#arrow");
    const arrowBox = document.getElementById("arrow-box");
    window.addEventListener('scroll', () => {
        if (window.scrollY > 900){
            arrow.className = "show";
            arrowBox.style.visibility = "visible"
        }
        else {
            arrowBox.style.visibility = "hidden"
            arrow.className = "hidden";
        }  
    });

}


function menu_content_detect(){ //menu 的背景動畫+內容偵測
    menu_content = document.querySelectorAll(".menu-table-content");
    menu_table = document.getElementById("menu-table");
    menu = document.getElementById("menu");
    const windowHeight = window.innerHeight; // 視窗的高度
    var backgroundfade = false ;
    const threshold = 220; // 計算元素上方的像素數
    const speed = 0.006;
    let change = 0.3;

    window.addEventListener('scroll', () => {
        const elementRect = menu_table.getBoundingClientRect(); //取得元素的位置
        const elementTop = Math.abs(elementRect.top); //取絕對值
        const pixelsAbove =  Math.abs(windowHeight - threshold);
        if (elementTop < pixelsAbove){
            var i = 0;

            function delay(){
                if (i < menu_content.length){
                    menu_content[i].classList.remove("hide_up");
                    menu_content[i].classList.add("menu-show");
                    setTimeout(delay, 180);
                    i++ ;
                }
            }

            function backgroundChange(){
                if (change<1){
                    menu.style.background = `linear-gradient(rgba(255, 255, 255, ${change*0.88}), rgba(255, 255, 255, ${change*0.78})),url("img/tablesetting.jpg") `;
                    menu.style.backgroundSize = "cover";
                    menu.style.backgroundPosition = "center 40%";
                    change += speed ;
                    console.log(change);
                    requestAnimationFrame(backgroundChange);
                }
                if (change < 0.6){
                    speed = 0.002 ;
                }
            }
                
            delay()
            if (backgroundfade == false){
                backgroundfade = true;
                backgroundChange()
            }
            
        }
        
    });

}

window.onload = pageload ;