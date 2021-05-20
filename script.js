//events
$(".filter").click(selectFilter)
$(document).on('click','.item-card',checkUncheck)
$(".clear").click(clearCompleted)
$().ready(calculateItems)
$(".theme-switcher").click(changeTheme)
//functions
function checkUncheck(){
    var classes = $(this)[0].className
    
    if(classes.includes("input-card")){
        console.log()
    }else if(classes.includes("whitecard")){
        $(this).toggleClass("whitechecked")
    }else{
        $(this).toggleClass("checked")
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
    $(".item-card").css("display","block")
    var cards = $(".item-card");
    cards.each(function(index){
        if(type=="completed"){
            $(".item-card").css("display","none")
            $(".item-card.checked").css("display","block")
            $(".item-card.whitechecked").css("display","block")
        }else if(type == "active"){
            $(".item-card.checked").css("display","none")
            $(".item-card.whitechecked").css("display","none")
        }
        $(".input-card").css("display","block")
    })
}
function addCard(e){
    if(e.charCode == 13){
        var text = $(".input-field").val()
        var formattedtext = '<div class="item-card""><h3>'+text+ '</h3></div>'
        if(text != ""){
            $(".checklist-footer").before(formattedtext)
            calculateItems()
        }else{
            console.log("Empty text")
        }
    }
}
function clearCompleted(){
    $(".checked").remove()
    $(".whitechecked").remove()
    calculateItems()
}
function calculateItems(){
    var noitems = ($(".item-card").length)-1
    console.log(noitems)
    $(".left").text(noitems + " items left")
    
}
function changeTheme(){
    $(".item-card").toggleClass("whitecard")
    $(".checklist-footer").toggleClass("whitefooter")
    $(".item-card").removeClass("checked")
    $(".item-card").removeClass("whitechecked")
    $("body").toggleClass("whitebody")
    $(".check-list").toggleClass("whitechecklist")
    $(".mobile-menu").toggleClass("whitemobile")
}
