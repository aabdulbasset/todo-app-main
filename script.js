//events
$(".filter").click(selectFilter)
$(document).on('click','.item-card',checkUncheck)
$(".clear").click(clearCompleted)
$().ready(function(){
    classify();
    calculateItems();
    responsive();
    test()

})
$(".theme-switcher").click(changeTheme)
$(window).resize(responsive)
//variables
var checked = []
var active = []

//functions
function classify(){
    checked= []
    active= []
    $("h3").each(function(i){
        if($("h3")[i].className == "checked"){
            if(checked.includes($("h3")[i].parentElement)){
                console.log()
            }else{
                checked.push($("h3")[i].parentElement)
            }
        }else if($("h3")[i].className != "checked"){
            if(active.includes($("h3")[i].parentElement)){
                console.log()
            }else{
                active.push($("h3")[i].parentElement)
            }
        }
    })
    test()
    calculateItems();
}
function test(){
    console.log(active)
    console.log("Checked: ")
    console.log(checked)
}
function responsive(){
    var width = $(window).width()
    if(width<1060){
        
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
    calculateItems();
}
function selectFilter(){
    var filter = $(this)[0].className
    $(".filter").removeClass("clicked")
    $(this).addClass("clicked")
    if(filter.includes("active")){
        applyFilter("active")
    }else if(filter.includes("completed")){
        applyFilter("completed")
    }else(
        applyFilter("all")
    ) 
}
function applyFilter(type){
    classify();
    console.log(type)
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
            $(".input-field").val("")
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
    test()
    checked.forEach(function(i){
        i.classList.add("removing")
        setTimeout(function(){i.remove()},500)
    })
    calculateItems()
}
function calculateItems(){
    var noOfItems = active.length
    var text = noOfItems + " items left"
    $(".left").text(text)
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
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    classify()
    calculateItems()
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});