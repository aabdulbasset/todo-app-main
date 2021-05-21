//events
$(".filter").click(selectFilter)
$(document).on('click','.item-card',checkUncheck)
$(".clear").click(clearCompleted)
$().ready(calculateItems)
$(".theme-switcher").click(changeTheme)
$(window).resize(responsive)
$().ready(responsive)
//functions
function responsive(){
    var width = $(window).width()
    if(width<1060){
        console.log($(".body-image-light")[0].src)
        $(".body-image-light").attr("src","images/bg-mobile-light.jpg")
        $(".body-image-dark").attr("src","images/bg-mobile-dark.jpg")
    }else{
        $(".body-image-light").attr("src","images/bg-desktop-light.jpg")
        $(".body-image-dark").attr("src","images/bg-desktop-dark.jpg")
    }
}
function checkUncheck(){
    var classes = $(this)[0].children[0]
    if(classes.className == "checked"){
        classes.className = ""
    }else if(classes.className == ""){
        classes.className = "checked"
    }
}
function selectFilter(){
    var filter = $(this)[0].className
    $(".filter").removeClass("clicked")
    $(this).addClass("clicked")
    if(filter == "filter active"){
        applyFilter("active")
    }else if(filter == "filter completed"){
        applyFilter("completed")
    }else(
        applyFilter("all")
    ) 
}
function applyFilter(type){
    var checked = []
    var active = []
    $("h3").each(function(i){
        if($("h3")[i].className == "checked"){
            checked.push($("h3")[i].parentElement)
        }else{
            active.push($("h3")[i].parentElement)
        }
    })

    if(type == "completed"){
        active.forEach(function(j,i){
            j.classList.add("removing")
        })
        checked.forEach(function(j,i){
            j.classList.remove("removing")
        })
    }else if(type == "active"){
        active.forEach(function(j,i){
            j.classList.remove("removing")
        })
        checked.forEach(function(j,i){
            j.classList.add("removing")
        })
    }else{
        active.forEach(function(j,i){
            j.classList.remove("removing")
        })
        checked.forEach(function(j,i){
            j.classList.remove("removing")
        })
    }
   
}
function addCard(e){
    if(e.charCode == 13){
        var text = $(".input-field").val()
        var formattedtext = '<div class="item-card removing""><h3>'+text+ '</h3></div>'
        if(text != ""){
            $(".checklist-footer").before(formattedtext)
            setTimeout(function(){
                $(".removing").removeClass("removing")
            },100)
            calculateItems()
        }else{
            console.log("Empty text")
        }
    }
}
function clearCompleted(){
    var loop = $(".checked");
    loop.each(function(i){
        $(".checked")[i].parentElement.classList.add("removing")
        setTimeout(function(){
            $(".removing").remove()
            
        },400)
    })

    
    calculateItems()
}
function calculateItems(){
    var noitems = ($(".item-card").length)-1
    console.log(noitems)
    $(".left").text(noitems + " items left")   
}
function changeTheme(){
    $("html").attr("data-theme",function(i,e){
        if(e=="light"){
            $(".theme-switcher").addClass("changing")
            setTimeout(function(){
                $(".theme-switcher").attr("src","images/icon-sun.svg")
                $(".theme-switcher").removeClass("changing")
            },150)
            return "dark"
        }else{
            $(".theme-switcher").addClass("changing")
            setTimeout(function(){
                $(".theme-switcher").attr("src","images/icon-moon.svg")
                $(".theme-switcher").removeClass("changing")
            },150)
            return "light"
        }
    })
    
}
