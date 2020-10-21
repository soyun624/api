$(function(){
    let favouriteBooks = localStorage.getItem('favourite') ? JSON.parse(localStorage.getItem('favourite')) : [];

    console.log(favouriteBooks)
    $.ajax({
        url: "https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade-hardcover.json?api-key=grMuMJr9zYeKe98uSf67PQsougSfcpJp", 
        dataType: 'json',
        success: function(res){
            let name = res.results.list_name;
            let date = res.results.published_date;
            let bookData = dataSanitizer(res);
 
            const checkFavourite = (item) => {

                const index = favouriteBooks.findIndex(e => e.id === item.id);
                return (index < 0 ) ? false : true;
               
            }

            bookData.forEach(data => {
                // const isFavourite = checkFavourite(data);
                const itemDiv = $('<div class="book-item"></div>').attr('id',data.primary_isbn10);
                const rank = $('<p></p>').text(`${data.rank}`);
                itemDiv.append(rank);
                
                // const icon = isFavourite ? $('<i class="fas fa-heart favourite"></i>') : $('<i class="fas fa-heart"></i>');
             
                const icon = $('<i class="fas fa-heart"></i>');
 
                itemDiv.append(icon);
                const title = $('<h4></h4>').text(data.title);
                itemDiv.append(title);
                const primary_isbn10 = $('<p></p>').text(`Isbn : ${data.primary_isbn10}`);
                itemDiv.append(primary_isbn10);
  
                const innerDiv = $('<div class="inner-item"></div>');
                const book_image = $('<img width="180">').attr('src',data.book_image);
                innerDiv.append(book_image);
               
                const contentDiv = $('<div class="content"></div>');
                const author = $('<h5></h5>').text(`Author : ${data.author}`);
                contentDiv.append(author);
                const description = $('<p></p>').text(data.description);
                contentDiv.append(description);
                const amazon_product_url = $('<a>Buy this book</a>').attr('href',data.amazon_product_url);
                contentDiv.append(amazon_product_url);
                innerDiv.append(contentDiv);
                itemDiv.append(innerDiv);
                $('.list').append(itemDiv);

            })

            //   let favouriteBooks = [];
            
            $('.fa-heart').click(function(e){
        
                let bookData = [];
                let target = $(e.target);
                let targetId = target.parent().attr('id')
                let isFav = target.hasClass('favourite')

                const favBook = bookData.find(e => e.id === targetId);
                const favIndex = favouriteBooks.findIndex(e => e.id === targetId);

                console.log("e.id : "+e.id);
                console.log("targetId : "+targetId);

                if (!isFav) {
                    favouriteBooks.push(favBook);
                } else {
                    favouriteBooks.splice(favIndex, 1)
                }               
           localStorage.setItem('favourite', JSON.stringify(favouriteBooks));
                target.toggleClass('favourite');
                console.log(favouriteBooks);
            
            })
   
        }
    
    })

})

function dataSanitizer(response){
    let data = [];

    response.results.books.forEach((d) => {
        
        data.push({
            rank: d.rank,
            primary_isbn10: d.primary_isbn10,
            title: (typeof d.title === 'undefined') ? 'unknown' : d.title,
            author: (typeof d.author === 'undefined') ? 'unknown' : d.author,
            description: d.description,
            book_image: d.book_image,
            amazon_product_url: d.amazon_product_url
        })
    })
    return data;
}
