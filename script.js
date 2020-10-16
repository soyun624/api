$(function(){
    $.ajax({
        url: "https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade-hardcover.json?api-key=grMuMJr9zYeKe98uSf67PQsougSfcpJp", 
        dataType: 'json',
        success: function(res){
            let name = res.results.list_name;
            let date = res.results.published_date;
            let bookData = dataSanitizer(res);
            
            bookData.forEach(data => {
                const itemDiv = $('<div class="book-item"></div>');
                const rank = $('<p></p>').text(`Rank : ${data.rank}`);
                itemDiv.append(rank);
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