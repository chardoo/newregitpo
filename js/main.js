
var cart = 0;
function addItem(id,name, description, price, moreInfo){
    let html = '';
    
    html += '<div class="item" data-id="'+id+'">'
    html += '<div class="name">'+ name +'</div>'
    html += ' <img src="assets/item1.jpeg">'
    html += '<div class="description">'+description+ '</div>'
 
    html +=  '<div class="price">'+price+'</div>'
 
    html += ' <button class="item-add">add to cart</button>'
    html += ' <button class="item-remove">Remove</button>'
    html +=  '<a class="more-info-link" href="#">More info</a>'
    html +=  '<div class="more-info">'+moreInfo +'</div>'
    html += '</div>'
    $('#container').prepend(html);
 
}



$(document).ready(function(){

   // adding new item 
    $('#button-create-item').on('click',
    function(){
   let name = $('#input-create-item').val();
   $('#input-create-item').val('');
   let des = $('#input-create-item-des').val();
   $('#input-create-item-des').val('');


   let pric = $('#input-create-item-pric').val();
   $('#input-create-item-pric').val('');
   
   //checking  for input values
   if(name == '' && des==''){
       
       $('#container').find('.error-message').slideToggle('fast')
   }
   else{
   
   let html = '';
    
   html += '<div class="item">'
   html += '<div class="name">'+ name +'</div>'
   html += ' <img src="assets/item1.jpeg">'
   html += '<div class="description">'+des+ '</div>'

   html +=  '<div class="price">'+pric+'</div>'

   html += ' <button class="item-add">add to cart</button>'
   html += ' <button class="item-remove">Remove</button>'
   html +=  '<a class="more-info-link" href="#">More info</a>'
   html +=  '<div class="more-info">Lorem, ipsum dolor sit amet </div>'
   html += '</div>'
   $('#container').prepend(html);
   }
})

// reomving item from the dashboard
$('#container').on('click', '.item-remove',
function(){
    $(this).parent().remove();
    cart-=100
    $('#cart-container').text('$'+ cart);
})

// showing more info by clicking on the info link
$('#container').on('click','.more-info-link', 
function(event){
event.preventDefault();
$(this).parent().find('.more-info').slideToggle('fast')
  })


  // making request to display all item in the json file
$.ajax('data/item.json',{
    dataType:'json',
    contentType:'application/json',
    cache:false
})
   
.done(function(response){
    console.log(response);
    let item = response.item;
    item.forEach(function(item){
        addItem(item.id,item.name,item.description,item.price,item.moreInfo)
        console.log(item);
    })
    
})

.fail(function(request, errorType, errorMessage){
  console.log(errorMessage);

})

.always(function(){

})


// making a posting request to add items to the cart
$('#container').on('click','.item-add', function(){

let id =$(this).parent().data('id');

    $.ajax('data/addToCart.json',{
    type:'post',
    data:{id: id },
    dataType:'json',
    contentType:'application/json'
})
.done(function(response){
    console.log(response)

    if(response.message ==='success'){
        let price = response.price;
        cart+=price
        $('#cart-container').text('$'+ cart);
    }
})
})

 // checking the box
$('#newletter-checkbox').on('change',function(){
    if($(this).is(':checked')){
    $('#newletter-frequency').fadeIn();
    }
    else{
        $('#newletter-frequency').fadeOut();
        console.log('no');
    }
})
$('#newletter-checbox').trigger('change');

// submitting a form by making a post request
$('#cart-form').on('click', function(e){
e.preventDefault();
 let mydat = {form:$(this).serialize(),
              price:cart
             }
             let email = $('#inputemail').val();
             if(email==''){
                 let mee = 'please enter email'
                $('#container').find('.error-message1').slideToggle('fast')
             }
    else{
             $.ajax($(this).attr('action'),{
                 type:'post',
                 data:mydat
             })
             .done(function(response){
                  alert(response.message)
                //  $('#feedback-message').text(response.message);
             })
            }
    })




})