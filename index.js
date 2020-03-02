
if(localStorage.length === 0){
    const DB = new Array;
   localStorage.setItem('DB',JSON.stringify(DB));
}

const cards = JSON.parse(localStorage.getItem('DB'));

function uniqueID() {
  return Math.floor(Date.now() + Math.random());
}

function isValidURL(string) {
  const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

function render(cards) {
  for(let card of cards)
  {
     cardContainer.innerHTML += renderCardTemlate(card);
  }
}

function validate()
{
  if(document.getElementById('product-image').value == '')
        {
       alert("Please set image URL!");
             document.getElementById('product-image').focus();
       return false;
        }

  else if(!isValidURL(document.getElementById('product-image').value))
              {
             alert("Please set a valid URL!");
                   document.getElementById('product-image').focus();
             return false;
              }

  else if(document.getElementById('product-name').value == '')
        {
       alert("Please set a name!");
              document.getElementById('product-name').focus();
       return false;
        }

  else if(document.getElementById('product-description').value == '')
        {
      alert("Please write a description!");
             document.getElementById('product-description').focus();
      return false;
        }

  else if(document.getElementById('product-price').value == '')
        {
      alert("Please set a price!");
            document.getElementById('product-price').focus();
      return false;
        }

  else if( isNaN(document.getElementById('product-price').value))
        {
        alert("Price must be a number!");
              document.getElementById('product-price').focus();
        return false;
        }

  else
      return true;
}

function addCard(){
  if (validate()){
  const productNameElement= document.getElementById('product-name');
  const productDescriptionElement=document.getElementById('product-description');
  const productPriceElement=document.getElementById('product-price');
  const productImageElement=document.getElementById('product-image');
  const db = JSON.parse(localStorage.getItem('DB'));
  db.push(
  {title: productNameElement.value,
  description: productDescriptionElement.value,
  price: productPriceElement.value,
  img: productImageElement.value,
  id: uniqueID()
})
localStorage.setItem('DB', JSON.stringify(db));
cardContainer.innerHTML += renderCardTemlate(db[db.length-1]);

alert('Product with name "' + productNameElement.value + '" created.');
 productNameElement.value= '';
 productDescriptionElement.value='';
 productPriceElement.value= '';
 productImageElement.value= '';
}
}

function showEditModal(cardId){
  const db = JSON.parse(localStorage.getItem('DB'));
  for (let card of db)
  {
    if (card.id == cardId)
    {
        modalContainer.innerHTML += modalFormsForEdit(card);
        $('#editModal').modal();
    }
  }
}

function editCard(cardId) {
  const thisCardBox = document.getElementById(cardId);
  const db = JSON.parse(localStorage.getItem('DB'));
  for (let card of db)
  {
    if (card.id == cardId)
    {
      card.title= document.getElementById('product-name-edit').value;
      card.description= document.getElementById('product-description-edit').value;
      card.price= document.getElementById('product-price-edit').value;
      card.img= document.getElementById('product-image-edit').value;
      indexOfCard = db.indexOf(card);
    }
  }
  localStorage.setItem('DB', JSON.stringify(db));
  document.location.reload(true);
}


function deleteCard(cardId)
{
  const confirmation = confirm("Are you sure you want to delete this product?");
  if (confirmation)
  {

  const db = JSON.parse(localStorage.getItem('DB'));
  for (let card of db)
  {
    if (card.id == cardId)
    {
      const indexOfCard = db.indexOf(card);
      let elem = document.getElementById(cardId);
      elem.parentNode.removeChild(elem);
      db.splice(indexOfCard, 1);
      localStorage.setItem('DB', JSON.stringify(db));
    }
  }
  }
}

const modalFormsForEdit = ({title, description, price, img, id}) =>
`<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">Edit</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="product-image-edit">Image URL</label>
            <textarea class="form-control" id="product-image-edit" rows="1" >${img}</textarea>
          </div>

          <div class="form-group">
            <label for="product-name-edit">Product name</label>
            <textarea class="form-control" id="product-name-edit" rows="1" >${title}</textarea>
          </div>
          <div class="form-group">
            <label for="product-description-edit">Product description</label>
            <textarea class="form-control" id="product-description-edit" rows="2">${description}</textarea>
          </div>

          <div class="form-group">
            <label for="product-price-edit">Price</label>
            <textarea class="form-control" id="product-price-edit" rows="2">${price}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick= "cutModal()">Close</button>
        <button id="Submit"  type="button" class="btn btn-primary" data-dismiss="modal" onclick="editCard(${id})" >Save changes</button>
      </div>
    </div>
  </div>
</div>`

const renderCardTemlate = ({title, description, price, img, id}) =>
`<div class="col mb-4" id= "${id}">
<div class="card" style="width: 18rem;">
  <img src="${img}" class="card-img-top" style= "height: 12rem; width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <p class="card-text">${price}</p>
    <div class="row justify-content-around">
    <button type="button" class="btn btn-warning custom-btn-width" id= "edit-card" onclick= "showEditModal(${id})" >Edit</button>
    <button type="button" class="btn btn-danger custom-btn-width" id= "delete-card" onclick= "deleteCard(${id})">Delete</button>
    </div>
  </div>
</div>
</div>
`

const cardContainer = document.querySelector('#card-container' );
const modalContainer = document.querySelector('#modal-container');


render(cards);
