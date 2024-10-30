var currentHeight = 0 ;
var In_menulist = false ;
var list_opening = false ;

function pageload() {
    menuList();
    
    menu_detect();
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

function menuList_ani(){
    var menu_list = document.getElementById("menu-list");
    list_opening = true ;
    menu_list.style.visibility = 'visible' ;
    // var currentHeight = 0 ;
    var speed = 2.7 ;
    function animation(){
        if (currentHeight < 100){
            menu_list.style.clipPath = `polygon(0 0, 100% 0, 100% ${currentHeight}%, 0 ${currentHeight}%)`;
            currentHeight += speed ;
            requestAnimationFrame(animation)
        }
    }
    animation()

}

function re_menuList_ani(){
    var menu_list = document.getElementById("menu-list");
    var speed = 2.7 ;
    if (In_menulist == true){
        In_menulist = false  ;
        return 
    }
    else{
        list_opening = false ;
    }
    function animation(){
        
        if (currentHeight > 0 && list_opening == false){
            menu_list.style.clipPath = `polygon(0 0, 100% 0, 100% ${currentHeight}%, 0 ${currentHeight}%)`;
            currentHeight -= speed ;
            requestAnimationFrame(animation)
        }
        else if (currentHeight <= 0){
            menu_list.style.visibility = 'hidden' ;
        }
    }
    animation()

}

function menu_detect(){
    var menu_area = document.getElementById("menu-button");
    var menu_button= document.getElementById("menu-button-area");
    menu_button.addEventListener("mouseover", menuList_ani );
    menu_area.addEventListener("mouseenter", function(){
        In_menulist = true ;
        list_opening = true ;
        menuList_ani ;
        
    });
    menu_button.addEventListener("mouseleave", function(){
        setTimeout(re_menuList_ani);
    });
    menu_area.addEventListener("mouseout", function(){
        console.log("hello");
        setTimeout(re_menuList_ani);
    });
    
}

window.onload = pageload ;