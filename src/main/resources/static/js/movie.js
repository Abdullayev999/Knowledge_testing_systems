// $('#cinema2').click(function() {
//     // $(this).text('В кинотеатрах');

//     $('#select2').animate({ left: '173' }, 150);

//     $('#tv2').css('color', 'white');
//     $('#cinema2').css('color', 'black');
// });

// $('#tv2').click(function() {

//     //$('#cinema').text('По ТВ');
//     //$('#cinema').show();
//     $('#select2').animate({ left: '0' }, 150);

//     $('#cinema2').css('color', 'white');
//     $('#tv2').css('color', 'black');
// });


//////////////////////////////////////////////





// $('#cinema3').click(function() {
//     // $(this).text('В кинотеатрах');

//     $('#select3').animate({ left: '173' }, 150);

//     $('#tv3').css('color', 'black');
//     $('#cinema3').css('color', '#8FF1C3');
// });

// $('#tv3').click(function() {

//     //$('#cinema').text('По ТВ');
//     //$('#cinema').show();
//     $('#select3').animate({ left: '0' }, 150);

//     $('#cinema3').css('color', 'black');
//     $('#tv3').css('color', '#8FF1C3');
// });


//////////////////////////////////////////////


{
    /* <div class="userPopular">
    <img class="profileIcon" src="./images/forest.jpg">
    <div class="data">
        <h1>firekos</h1>
        <span class="voice"><div class="green"></div><label class="greenCount">31,973s</label></span>
        <span class="voice"><div class="red"></div><label  class="greenCount">17,747</label></span>
    </div>
    </div> */
}

let data = $('.statistic').find('.userPopular');
console.log(data);
for (const iterator of data) {
    let green = $(iterator).find('.greenCount').text();
    let red = $(iterator).find('.redCount').text();
    $(iterator).find('.green').css('width', green);
    $(iterator).find('.red').css('width', red);
}


const baseUrl = 'https://api.themoviedb.org/3/movie/550?api_key=';
const apiKey = '9d005c81618cf4d45a9f6977b2d85774';

//https://api.themoviedb.org/3/movie/popular?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&page=1


function downloadItem(list, template, data, isAppend = false) {
    let populars = $(list);
    if (!isAppend) {
        populars.html("");
    }


    let templateHtml = $(template).html();
    var template = Handlebars.compile(templateHtml);

    for (const item of data.results) {
        // console.log(item.poster_path);
        item.vote_average *= 10;
        let movie = template(item);

        // if ($(movie).find('img').attr('src').charAt($(movie).find('img').attr('src').length - 1) == '0') {
        //     $(movie).find('img').attr('src', '/images/notImg.png');
        //     $(movie).find('img').attr("src", "second.jpg");
        // }

        populars.append(movie);

        if (item.vote_average >= 80) {
            percentColor(list + ' .progresBar .box .chart', "#36e617");
        } else if (item.vote_average > 65) {
            percentColor(list + ' .progresBar .box .chart', "orange");
        } else {
            percentColor(list + ' .progresBar .box .chart', "red");
        }
    }
}

function percentColor(path, color) {
    $(path).easyPieChart({
        size: 160,
        barColor: color,
        scaleLength: 0,
        lineWidth: 15,
        trackColor: "#525151",
        lineCap: "circle",
        animate: 2000,
    });
}



async function getPopularCinema() {
    let data = await (await fetch("https://api.themoviedb.org/3/movie/popular?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&page=1")).json();
    console.log(data);
    downloadItem('.populars', '#templateHtmlCinema', data);
}

async function getPopularTv() {
    let data = await (await fetch("https://api.themoviedb.org/3/tv/popular?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&page=1")).json();

    console.log(data);
    downloadItem('.populars', '#templateHtmlTv', data);
}



// $('#cinema').click(function() {
//     // $(this).text('В кинотеатрах');

//     // $('#select').animate({ left: '173' }, 150);

//     // $('#tv').css('color', 'black');
//     // $('#cinema').css('color', '#8FF1C3');
// });

// $('#tv').click(function() {

//     //$('#cinema').text('По ТВ');
//     // //$('#cinema').show();
//     // $('#select').animate({ left: '0' }, 150);

//     // $('#cinema').css('color', 'black');
//     // $('#tv').css('color', '#8FF1C3');
// });


$('#tv').click(function(e) {
    e.preventDefault();

    $('#select').animate({ left: '0' }, 370);
    $('#tv').css('color', '#8FF1C3');
    $('#cinema').css('color', 'black');

    getPopularTv();
});

$('#cinema').click(function(e) {
    e.preventDefault();

    $('#select').animate({ left: '173' }, 370);
    $('#cinema').css('color', '#8FF1C3');
    $('#tv').css('color', 'black');

    getPopularCinema();
});


getPopularTv();


////////////////////////////////////////////////////////


//$('.popularsTrails .item').click(function(e) {
//    e.preventDefault();
//    console.log(this);
//    $(this).find('iframe').css('width', 400);
//    $(this).find('iframe').css('height', 400);
//});



//cinema
//https://api.themoviedb.org/3/movie/580489?api_key=9d005c81618cf4d45a9f6977b2d85774&append_to_response=videos

//tv
//https://api.themoviedb.org/3/tv/90462/videos?api_key=9d005c81618cf4d45a9f6977b2d85774&append_to_response=videos



// today
//https://api.themoviedb.org/3/trending/all/day?api_key=9d005c81618cf4d45a9f6977b2d85774

// today
//https://api.themoviedb.org/3/trending/week/day?api_key=9d005c81618cf4d45a9f6977b2d85774





async function getTrendsToday() {
    let data = await (await fetch("https://api.themoviedb.org/3/trending/all/week?api_key=9d005c81618cf4d45a9f6977b2d85774")).json();

    console.log(data);
    downloadItem('.trends', '#templateHtmlCinema', data);
}

async function getTrendsAll() {
    let data = await (await fetch("https://api.themoviedb.org/3/trending/all/day?api_key=9d005c81618cf4d45a9f6977b2d85774")).json();

    console.log(data);
    downloadItem('.trends', '#templateHtmlCinema', data);
}



$('#cinema3').click(function() {
    // $(this).text('В кинотеатрах');

    $('#select3').animate({ left: '173' }, 150);

    $('#tv3').css('color', 'black');
    $('#cinema3').css('color', '#8FF1C3');

    getTrendsToday();
});

$('#tv3').click(function() {

    //$('#cinema').text('По ТВ');
    //$('#cinema').show();
    $('#select3').animate({ left: '0' }, 150);

    $('#cinema3').css('color', 'black');
    $('#tv3').css('color', '#8FF1C3');


    getTrendsAll();
});

getTrendsToday();


//////////////////////////////////////////////////////////////////////////////

//https://api.themoviedb.org/3/movie/796499/videos?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US

async function getTrailsBy(type) {
    let data = await (await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=9d005c81618cf4d45a9f6977b2d85774`)).json();
    let populars = $('.popularsTrails');
    populars.html("");

    let templateHtml = $('#templateHtmlTrail').html();
    let template = Handlebars.compile(templateHtml);



    for (const item of data.results) {
        try {
            let movie = await (await fetch(`https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();

            movie.results[0].poster_path = item.poster_path;
            let trail = template(movie.results[0]);
            populars.append(trail);
        } catch (error) {

        }
    }
}

$('#cinema2').click(function() {
    // $(this).text('В кинотеатрах');

    $('#select2').animate({ left: '173' }, 150);
    $('#tv2').css('color', 'white');
    $('#cinema2').css('color', 'black');


    getTrailsBy("movie");

});


$('#tv2').click(function() {

    //$('#cinema').text('По ТВ');
    //$('#cinema').show();
    $('#select2').animate({ left: '0' }, 150);
    $('#cinema2').css('color', 'white');
    $('#tv2').css('color', 'black');

    getTrailsBy("tv");
});


getTrailsBy("tv");
//$('.blackFon').hide();

$('.blackFon').click(function(e) {
    e.preventDefault();
    $(this).hide();

    $('#zoomPhoto').hide();
    $('iframe').remove();
});


$('.popularsTrails').on('click', '.item', function(e) {
    e.preventDefault();
    let url = $(this).find('#url').text();
    console.log(url);


    $('body').append('<iframe width="900" height="615" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $('.blackFon').show();
    $('iframe').attr('src', "");
    $('iframe').attr('src', url);
});



//////////////////////////////////////////////////////////


$('.XBtn').hide();
//$('.searchMovie').hide();
//$('.subMenyu').show();
$('.subMenyu').css("display", "none");
$('.subMenyu').removeAttr('hidden');


$('.searchMovie').css("display", "flex");
$('.searchMovie').hide();

//$(".subMenyu").css("display", "block", "!important");

$('.searchBtn').click(function() {
    $('.searchMovie').slideDown(250);
    $('.searchBtn').hide();
    $('.XBtn').show();
})
$('.XBtn').click(function() {
    $('.searchMovie').slideUp(300);
    $('.searchBtn').show();
    $('.XBtn').hide();
})

$('.clearBtn').click(function() {
    $(".searchMovie input").val("");
});






$('#moviePage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuMovie').show();

})
$('#moviePage').on('mouseleave', function() {
    $('#subMenyuMovie').hide();
})

$('#subMenyuMovie').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuMovie').show();
})

$('#subMenyuMovie').on('mouseleave', function() {
    $('#subMenyuMovie').hide();
})





$('#serialPage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuSerial').show();

})
$('#serialPage').on('mouseleave', function() {
    $('#subMenyuSerial').hide();
})

$('#subMenyuSerial').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuSerial').show();
})



$('#subMenyuSerial').on('mouseleave', function() {
    $('#subMenyuSerial').hide();
})



$('#peoplePage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPeople').show();

})
$('#peoplePage').on('mouseleave', function() {
    $('#subMenyuPeople').hide();
})

$('#subMenyuPeople').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPeople').show();
})

$('#subMenyuPeople').on('mouseleave', function() {
    $('#subMenyuPeople').hide();
})


$('#elsePage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuElse').show();

})
$('#elsePage').on('mouseleave', function() {
    $('#subMenyuElse').hide();
})

$('#subMenyuElse').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuElse').show();
})

$('#subMenyuElse').on('mouseleave', function() {
    $('#subMenyuElse').hide();
})



$('#plusPage').on('click', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPlus').show();

})
$('#plusPage').on('mouseleave', function() {
    $('#subMenyuPlus').hide();
})

$('#subMenyuPlus').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPlus').show();
})

$('#subMenyuPlus').on('mouseleave', function() {
    $('#subMenyuPlus').hide();
})


////////////////////////////////////////////////
//$('#zoomPhoto').hide();

// $('.actorDetail .img').click(function() { //zooom
//     //   $(event.target).find('#zoomPhoto').attr('src', `https://image.tmdb.org/t/p/w500/8jNFfNmqHVqLHnGnxgu7y8xgRIa.jpg"`);
//     console.log("suki");
//     $('.blackFon').show();
//     let url = $('.actorDetail #fontImg').attr('src');
//     console.log(url);
//     $('#zoomMovie').attr('src', url);
//     $('#zoomPhoto').show();
//     //$('#zoomPhoto').attr('src', '');
// })



//!!!!!!!!!!!!!!!!!!!!!!!!
// $('#imgPath .img #fontImg').click(function() { //zooom
//         //   $(event.target).find('#zoomPhoto').attr('src', `https://image.tmdb.org/t/p/w500/8jNFfNmqHVqLHnGnxgu7y8xgRIa.jpg"`);
//         console.log("sami");
//         $('.blackFon').show();
//         let url = $('#detailContent #fontImg').attr('src');
//         console.log(url);
//         $('#zoomMovie').attr('src', url);
//         $('#zoomPhoto').show();
//         //$('#zoomPhoto').attr('src', '');
//     })
//$('#zoomPhoto').hide();

let modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
let img = document.getElementById("fontImg");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
//////////////////////////////////////////////////////////

let modal2 = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
let img2 = document.querySelector(".zoomCinema");
let modalImg2 = document.getElementById("img01");
let captionText2 = document.getElementById("caption");
img2.onclick = function() {
    modal2.style.display = "block";
    modalImg2.src = this.src;
    captionText2.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
let span2 = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modal2.style.display = "none";
}
//////////////////////////////////////////////////////////zoomCinema



$('#lookTrailer').click(function() { //Look trailer
    console.log(200);


    let url = $(this).find('#url').text();
    console.log(url);


    $('body').append('<iframe width="900" height="615" style="position:absolute;margin:auto;top:25%" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $('.blackFon').show();
    $('iframe').attr('src', "");
    $('iframe').attr('src', url);


});




//////////////////////////////////////////////////////////////////////////////////////////////////////

//$('#detailContent').hide();

$('#returnHome').click(function() {
    $('#mainContent').show();
    $('#detailContent').hide();
    $('.querys').hide();
});

$('.populars').click(function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        getInfo(id, type);
    }


    //  getInfo('335983', 'movie');


});

$('.queryList').click(function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        getInfo(id, type);
        $('.querys').hide();
    }


    //  getInfo('335983', 'movie');


});


$('.queryList').on('click', '.queryResult', function() {

    let id = $(this).find('img').attr("data-id")
    let type = $(this).find('img').attr("data-type")

    if (id != null && type != null) {
        getInfo(id, type);
        $('.querys').hide();
    }
})

$('.trends').click(function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        getInfo(id, type);
    }


    //  getInfo('335983', 'movie');
})

$('.ListMovieForActors').click(function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        $('.actorDetail').hide();
        getInfo(id, type);
    }

    //  getInfo('335983', 'movie');
})


$('.ListActors').click(function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        getInfo(id, type);
        $('.detailMovie').hide();
    }


    //  getInfo('335983', 'movie');
})

$('#viewMovies').click(function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {

        $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
        removeLoader();
        getInfo(id, type);
        $('.searchResult').hide();
    }


    //  getInfo('335983', 'movie');
})

async function getInfo(id, type) {
    let data = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();

    //console.log(999);
    //console.log(data);
    if (data != null) {
        $('#mainContent').hide();
        $('.searchResult').hide();
        console.log(type);
        if (type == 'movie') {
            $('#detailContent').find('#detail-name').text(data.original_title);
            $('#detailContent').find('#detail-year').text(`(${data.release_date.substring(0,4)})`);
            $('#detailContent').find('#relase').text(data.release_date + ` (${data.original_language.toUpperCase()})`);
            let str = "";

            for (let i = 0; i < data.genres.length; i++) {
                str += data.genres[i].name;
                if (i < data.genres.length - 1) {
                    str += " , ";
                }
            }

            $('#detailContent').find('#ganres').text(str);
            $('#detailContent').find('#runtime').text(`${Math.floor(data.runtime/60)}h ${data.runtime%60}m`);

            $('#detailContent').find('.box').remove();
            $('#detailContent').find('.progresBar').prepend(`<div class="box"><div class="chart" data-percent="0">0</div></div>`);

            $('#detailContent').find('.chart').text(`${Math.round(data.vote_average * 10)}%`);
            $('#detailContent').find('.chart').attr('data-percent', (data.vote_average * 10));

            if (data.vote_average * 10 >= 80) {
                percentColor('#imgPath .progresBar .box .chart', "#36e617");
            } else if (data.vote_average * 10 > 65) {
                percentColor('#imgPath .progresBar .box .chart', "orange");
            } else {
                percentColor('#imgPath .progresBar .box .chart', "red");
            }

            $('#detailContent').find('#overview').text(data.overview);
            $('#detailContent').find('#budget').show();
            $('#detailContent').find('#budget').text(`${data.budget} $`);
            $('#detailContent').find('#popularity').text(`${data.popularity}`);
            $('#detailContent').find('#link').text(data.original_title);
            $('#detailContent').find('#link').attr('href', data.homepage);
            $('#detailContent').find('#status').text(data.status);
            $('#detailContent').find('#original_language').text(data.original_language);



            let movie = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();
            console.log('----------------------\n\n');
            console.log(movie);
            if (movie.results.length > 0) {
                $('#detailContent').find('#url').text(`https://www.youtube.com/embed/${movie.results[0].key}`);
            }

            console.log("BRAWOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(data);

            $('#detailContent').find('#fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.poster_path}`);
            $('#detailContent').find('#imgPath').css('background-image', `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`);




            let dataActors = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();

            console.log("----------------OOOOOOOOOOOOOOOOOOOOOOOOOOO---------------\n\n");
            console.log(dataActors);
            let list = $('.left .ListActors');
            list.html("");

            let templateHtml = $('#templateActors').html();
            let template = Handlebars.compile(templateHtml);



            for (const item of dataActors.cast) {
                if (item.gender == 2) {
                    item.gender = "Man"
                } else {
                    item.gender = "Woman"
                }

                if (item.profile_path == null) {
                    continue;
                }

                let actor = template(item);

                list.append(actor);

            }
            $('#detailContent').show();
        } else if (type == 'tv') {
            console.log("TV");
            console.log(type);
            $('#detailContent').find('#detail-name').text(data.name);
            $('#detailContent').find('#detail-year').text(`(${data.first_air_date.substring(0,4)})`);
            $('#detailContent').find('#relase').text(data.first_air_date + ` (${data.languages[0].toUpperCase()})`);
            let str = "";

            for (let i = 0; i < data.genres.length; i++) {
                str += data.genres[i].name;
                if (i < data.genres.length - 1) {
                    str += " , ";
                }
            }

            $('#detailContent').find('#ganres').text(str);
            $('#detailContent').find('#runtime').text(`${Math.floor(data.episode_run_time/60)}h ${data.episode_run_time%60}m`);

            $('#detailContent').find('.box').remove();
            $('#detailContent').find('.progresBar').prepend(`<div class="box"><div class="chart" data-percent="0">0</div></div>`);

            $('#detailContent').find('.chart').text(`${Math.round(data.vote_average * 10)}%`);
            $('#detailContent').find('.chart').attr('data-percent', (data.vote_average * 10));

            if (data.vote_average * 10 >= 80) {
                percentColor('#imgPath .progresBar .box .chart', "#36e617");
            } else if (data.vote_average * 10 > 65) {
                percentColor('#imgPath .progresBar .box .chart', "orange");
            } else {
                percentColor('#imgPath .progresBar .box .chart', "red");
            }

            $('#detailContent').find('#overview').text(data.overview);
            $('#detailContent').find('#budget').hide();
            $('#detailContent').find('#popularity').text(`${data.popularity}`);
            $('#detailContent').find('#link').text(data.name);
            $('#detailContent').find('#link').attr('href', data.homepage);
            $('#detailContent').find('#status').text(data.status);
            $('#detailContent').find('#original_language').text(data.original_language);



            let movie = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();

            console.log(movie.results[0]);
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@');
            let list = $('.left .ListActors');
            list.html("");
            if (movie.results[0]) {
                $('#detailContent').find('#url').text(`https://www.youtube.com/embed/${movie.results[0].key}`);

                $('#detailContent').find('#fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.poster_path}`);
                $('#detailContent').find('#imgPath').css('background-image', `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`);




                let dataActors = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();



                let templateHtml = $('#templateActors').html();
                let template = Handlebars.compile(templateHtml);



                for (const item of dataActors.cast) {
                    if (item.gender == 2) {
                        item.gender = "Man"
                    } else {
                        item.gender = "Woman"
                    }

                    let actor = template(item);

                    if (item.profile_path == null) {
                        continue;
                    }
                    list.append(actor);

                }
            } else {
                $('#detailContent').find('#fontImg').attr('src', './images/notImg.png');
                $('#detailContent').find('#imgPath').attr('src', './images/notImg.png');
            }
            $('#detailContent').show();
        } else if (type == 'person') {

            $('.actorDetail #fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.profile_path}`);
            $('.actorDetail #overview').text(data.name);
            $('.actorDetail #bio').text(data.biography);
            $('.actorDetail #known-for-department').text(data.known_for_department);

            if (data.gender == 2) {
                $('.actorDetail #gender').text("Man");
            } else {
                $('.actorDetail #gender').text("Woman");
            }

            if (data.deathday) {
                $('.actorDetail #bday').text(`${data.birthday} \n(Death ${data.deathday})`);
            } else {

                let hbd = new Date(data.deathday).getFullYear();
                let now = new Date().getFullYear();
                $('.actorDetail #bday').text(`${data.birthday} (${now-hbd})`);
            }

            $('.actorDetail #place-of-birth').text(data.place_of_birth);

            $('.actorDetail #anothrer-name').html("");
            for (const name of data.also_known_as) {
                $('.actorDetail #anothrer-name').append(`<p>${name}</p>`);
            }

            let movie_credits = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/movie_credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();
            let tv_credits = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/tv_credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();
            let list = $('.ListMovieForActors');
            list.html(" ");

            let templateHtml = $('#templateActorsMovie').html();
            let template = Handlebars.compile(templateHtml);


            $('#actorHistory').html();

            console.log(movie_credits);
            //Add Movie
            for (const movie of movie_credits.cast) {

                if (movie.poster_path) {
                    movie.poster_path = `https://image.tmdb.org/t/p/w500/${ movie.poster_path}`;
                } else {
                    movie.poster_path = './images/notImg.png';
                }


                let item = template(movie);

                list.append(item);

                let year = new Date(movie.release_date).getFullYear();
                $('#actorHistory').append(`<tr>
                <td>${year}</td>
                <td>○</td>
                <td>${movie.original_title}</td>
                <td>(movie)</td>
            </tr>`);
            }

            ///Add tv
            templateHtml = $('#templateActorsTv').html();
            template = Handlebars.compile(templateHtml);

            for (const tv of tv_credits.cast) {

                if (tv.poster_path) {
                    tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                } else {
                    tv.poster_path = './images/notImg.png';
                }


                let item = template(tv);
                list.append(item);

                let year = new Date(tv.first_air_date).getFullYear();
                $('#actorHistory').append(`<tr>
                <td>${year}</td>
                <td>○</td>
                <td>${tv.original_name}</td>
                <td>(tv)</td>
            </tr>`);
            }
            console.log(tv_credits);

            $('.actorDetail').show();
        }



    }

    //console.log(dataActors);
    //console.log(data);
}


/////////////////////////////////////////////////////////////////


$('.comboBox .head').click(function() {
    $(this).next().slideToggle(500);
    $(this).find('i')
        .toggleClass('fas fa-chevron-right')
        .toggleClass('fas fa-chevron-up');

})


$('.comboBox .genre label').click(function() {
    $(this).toggleClass('white')
        .toggleClass('blue');
})

$('.comboBox .sertificat label').click(function() {
    $(this).toggleClass('white')
        .toggleClass('blue');
})








async function getTypeByOption(type, option, page = 1, isAppend = false) {
    let data = await (await fetch(`https://api.themoviedb.org/3/${type}/${option}?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&page=${page}`)).json();
    console.log(data);
    totalPages = data.total_pages;
    if (type == "movie") {
        downloadItem('#viewMovies', '#templateMovie', data, isAppend);
    } else {
        downloadItem('#viewMovies', '#templateTv', data, isAppend);
    }

}



let isBlock = false;

$(window).scroll(async function() {
    if ($('#downloadMore').css('display') == 'none') {
        // console.log('daaa');
        // console.log(totalPages);
        // console.log(page);
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 90 && !isBlock) {
            isBlock = true;
            page++;
            console.log(page);
            if (page > totalPages)
                return;

            await getTypeByOption(type, option, page, true);
            isBlock = false;
        }
        return;
    }

    if ($('#downloadMorePeople').css('display') == 'none') {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 90 && !isBlock) {
            isBlock = true;
            page++;
            if (page > totalPages)
                return;

            await getPopularActors(page);
            isBlock = false;
        }
    }

    if ($('#downloadMoreQuery').css('display') == 'none') {
        console.log("1111111111111111111111111");
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 90 && !isBlock) {
            console.log("2222222222222222222222222");
            isBlock = true;
            page++;
            if (page > totalPages)
                return;

            await loadNewItems(page, typeQ, searchQ);
            isBlock = false;
        }
    }
}); //????????????????????????????????????????????



let totalPages = 0;
let page = 1;
let type = '';
let option = '';


function hides() {
    $('#mainContent').hide();
    $('#detailContent').hide();
    $('.searchResult').hide();
    $('#downloadMore').hide();
    $('#viewMovies').html(" ");
    $('.searchResult .movie-tv').show();
    $('.searchResult .people').hide();
    $('#downloadMorePeople').show();
    $('.actorDetail').hide();
    $('.querys').hide();
    type = '';
    option = '';
    totalPages = 0;
    page = 1;
    isBlock = false;
}

$('#href-popular').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'popular';

    await getTypeByOption(type, option, page);
})

$('#href-look-now').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'now_playing';

    await getTypeByOption(type, option, page);
})

$('#href-upcoming').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'upcoming';

    await getTypeByOption(type, option, page);
})

$('#href-top-rated').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'top_rated';

    await getTypeByOption(type, option, page);

})

$('#href-tv-popular').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'popular';

    await getTypeByOption(type, option, page);
})

$('#href-airing-today').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'airing_today';

    await getTypeByOption(type, option, page);
})

$('#href-on-the-air').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'on_the_air';

    await getTypeByOption(type, option, page);
})

$('#href-top-rated-tv').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'top_rated';

    await getTypeByOption(type, option, page);
})



async function getPopularActors(page = 1) {
    let dataActors = await (await fetch(`https://api.themoviedb.org/3/person/popular?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&page=${page}`)).json();
    console.log(dataActors);

    totalPages = data.total_pages;
    page = 1;

    let list = $('.people .ListActors');

    let templateHtml = $('#templateActor').html();
    let template = Handlebars.compile(templateHtml);



    for (const item of dataActors.results) {
        if (item.gender == 2) {
            item.gender = "Man"
        } else {
            item.gender = "Woman"
        }

        if (item.profile_path == null) {
            continue;
        }

        let actor = template(item);

        list.append(actor);

    }

}



$('#href-popular-people').click(async function() {
    event.preventDefault();

    hides();
    $('.downloadMorePeople').show();
    $('.downloadMoreQuery').show();
    $('#downloadMore').show();
    $('.searchResult').show();
    $('.searchResult .people').show();
    $('.searchResult .movie-tv').hide();
    $('.people .ListActors').html(" ");
    await getPopularActors();
})


/////////////////////////////////////////////////////
$('#downloadMore').click(async function() {
    page++;

    await getTypeByOption(type, option, page);
    $('#downloadMore').hide();

})

$('#downloadMorePeople').click(async function() {
    page++;

    await getPopularActors(page);
    $('#downloadMorePeople').hide();

})





//https://api.themoviedb.org/3/movie/335983?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US
//https://api.themoviedb.org/3/movie/580489/credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US



//$('.actorDetail').show();


$('.ListActors').click(function() {
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    removeLoader();
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');
    if ($(event.target).attr('data-id')) {
        getInfo(id, type);
    }
    //  getInfo('335983', 'movie');
    //$('.actorDetail').show();

});



/////////////////////////////////////////////
$(window).on('load', function() {
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});

function removeLoader() {
    $('#footer').hide();
    $("#loadingDiv").fadeOut(2000, function() {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight

    });
    $('#footer').show();
}


/////////////////////////////////////////////////////////////

$('.selectQuery').click(async function() {

    if (!$(this).hasClass('active')) {

        $('#downloadMoreQuery').show();
        unActive();
        $(this).addClass('active');
        $(".queryList").html(" ");
        typeQ = $(".active p:first").text();
        page = 1;
        await loadNewItems(page, typeQ, searchQ);
        console.log(totalPages);
        console.log(page);
        console.log(totalPages);
        if (totalPages == 1 || page > 1 || totalPages == 0) {
            $('#downloadMoreQuery').hide();
        }
    }
})

function unActive() {
    $('.selectQuery').removeClass('active');
}

let typeQ = "";
let searchQ = "";
let total_results = 0;

$('.querys').hide();
//$('.querys').css('display', 'block');

$('.btnSearch').click(async function() {
    event.preventDefault();
    searchQ = $("#searchMovie").val();
    console.log(searchQ);
    if (searchQ != null && searchQ.length > 0) {
        console.log(1234);
        $('#mainContent').hide();
        $('.searchResult .people').hide();
        $('.searchResult .movie-tv').hide();
        $('#detailContent').hide();
        $('.querys').show();
        typeQ = $(".active p:first").text()
        page = 1;

        let dataMovie = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryMovie p:last").text(dataMovie.total_results);

        let dataTv = await (await fetch(`https://api.themoviedb.org/3/search/tv?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryTv p:last").text(dataTv.total_results);

        let dataPerson = await (await fetch(`https://api.themoviedb.org/3/search/person?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryPerson p:last").text(dataPerson.total_results);

        let dataCompany = await (await fetch(`https://api.themoviedb.org/3/search/company?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryCompany p:last").text(dataCompany.total_results);


        let dataKeyword = await (await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryKeyword p:last").text(dataKeyword.total_results);


        console.log(dataMovie);
        $(".queryList").html(" ");


        if (typeQ == 'Фильмы') {
            totalPages = dataMovie.total_pages;
            total_results = dataMovie.total_results;

            let templateHtml = $('#templateQueyMovie').html();
            let template = Handlebars.compile(templateHtml);

            for (const movie of dataMovie.results) {
                movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                let item = template(movie);
                $(".queryList").append(item);
            }
        } else if (typeQ == 'Сериалы') {
            totalPages = dataTv.total_pages;
            total_results = dataTv.total_results;

            let templateHtml = $('#templateQueyTv').html();
            let template = Handlebars.compile(templateHtml);

            for (const tv of dataTv.results) {
                tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                let item = template(tv);
                $(".queryList").append(item);
            }
        } else if (typeQ == 'Люди') {
            totalPages = dataPerson.total_pages;
            total_results = dataPerson.total_results;

            let templateHtml = $('#templateQueyPeople').html();
            let template = Handlebars.compile(templateHtml);

            for (const people of dataPerson.results) {
                if (people.gender == 0) {
                    people.gender = 'Man';
                } else {
                    people.gender = 'Woman';
                }
                let item = template(people);
                $(".queryList").append(item);
            }
        } else if (typeQ == 'Ключевые слова') {
            totalPages = dataKeyword.total_pages;
            total_results = dataKeyword.total_results;

            for (const words of dataKeyword.results) {
                $(".queryList").append(`<p>${words.name}</p>`);
            }
        } else if (typeQ == 'Компании') {
            totalPages = dataCompany.total_pages;
            total_results = dataCompany.total_results;

            for (const company of dataCompany.results) {
                $(".queryList").append(`<p>${company.name}</p>`);
            }
        }

        total_results = Math.ceil(total_results / 20);

        if (total_results == 0) {
            $('#downloadMoreQuery').hide();
        }

        //     <div class="queryResult">
        //     <img src="./images/banana.jpg">
        //     <div class="info">
        //         <h5>Hulk</h5>
        //         <small>19 июня 2003</small>
        //         <p id="description">Lorem ipsum dolor sem ipsum em ipsum dolor sem ipsum dolor sem ipsum dolor sem ipsum dolor sdem ipsum dolor sem ipsum dolor solor sem ipsum dolor sit amet consectetur adipisicing elit. Similique tempore voluptatum iusto dolorum
        //             expedita perspiciatis consequatur dolore quos deleniti quisquam?</p>
        //     </div>
        // </div>
    }
})

$("#searchMovie").on('keyup', async function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        console.log("enter");



        searchQ = $("#searchMovie").val();
        console.log(searchQ);
        if (searchQ != null && searchQ.length > 0) {
            console.log(1234);

            $('.searchResult .people').hide();
            $('.searchResult .movie-tv').hide();
            $('#mainContent').hide();
            $('#detailContent').hide();
            $('.querys').show();
            typeQ = $(".active p:first").text()
            page = 1;

            let dataMovie = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryMovie p:last").text(dataMovie.total_results);

            let dataTv = await (await fetch(`https://api.themoviedb.org/3/search/tv?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryTv p:last").text(dataTv.total_results);

            let dataPerson = await (await fetch(`https://api.themoviedb.org/3/search/person?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryPerson p:last").text(dataPerson.total_results);

            let dataCompany = await (await fetch(`https://api.themoviedb.org/3/search/company?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryCompany p:last").text(dataCompany.total_results);


            let dataKeyword = await (await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryKeyword p:last").text(dataKeyword.total_results);


            console.log(dataMovie);
            $(".queryList").html(" ");


            if (typeQ == 'Фильмы') {
                totalPages = dataMovie.total_pages;
                total_results = dataMovie.total_results;

                let templateHtml = $('#templateQueyMovie').html();
                let template = Handlebars.compile(templateHtml);

                for (const movie of dataMovie.results) {
                    movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    let item = template(movie);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Сериалы') {
                totalPages = dataTv.total_pages;
                total_results = dataTv.total_results;

                let templateHtml = $('#templateQueyTv').html();
                let template = Handlebars.compile(templateHtml);

                for (const tv of dataTv.results) {
                    tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                    let item = template(tv);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Люди') {
                totalPages = dataPerson.total_pages;
                total_results = dataPerson.total_results;

                let templateHtml = $('#templateQueyPeople').html();
                let template = Handlebars.compile(templateHtml);

                for (const people of dataPerson.results) {
                    if (people.gender == 0) {
                        people.gender = 'Man';
                    } else {
                        people.gender = 'Woman';
                    }
                    let item = template(people);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Ключевые слова') {
                totalPages = dataKeyword.total_pages;
                total_results = dataKeyword.total_results;

                for (const words of dataKeyword.results) {
                    $(".queryList").append(`<p>${words.name}</p>`);
                }
            } else if (typeQ == 'Компании') {
                totalPages = dataCompany.total_pages;
                total_results = dataCompany.total_results;

                for (const company of dataCompany.results) {
                    $(".queryList").append(`<p>${company.name}</p>`);
                }
            }

            total_results = Math.ceil(total_results / 20);

            if (total_results == 0) {
                $('#downloadMoreQuery').hide();
            }

            //     <div class="queryResult">
            //     <img src="./images/banana.jpg">
            //     <div class="info">
            //         <h5>Hulk</h5>
            //         <small>19 июня 2003</small>
            //         <p id="description">Lorem ipsum dolor sem ipsum em ipsum dolor sem ipsum dolor sem ipsum dolor sem ipsum dolor sdem ipsum dolor sem ipsum dolor solor sem ipsum dolor sit amet consectetur adipisicing elit. Similique tempore voluptatum iusto dolorum
            //             expedita perspiciatis consequatur dolore quos deleniti quisquam?</p>
            //     </div>
            // </div>
        }
    }
});

$(".searchMovie").on('keyup', async function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        console.log("enter");

        searchQ = $(".searchMovie input").val();
        if (searchQ != null && searchQ.length > 0) {
            $('.querys').show();
            $('#mainContent').hide();
            $('#detailContent').hide();
            $('.searchResult .people').hide();
            $('.searchResult .movie-tv').hide();

            typeQ = $(".active p:first").text()
            page = 1;

            let dataMovie = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryMovie p:last").text(dataMovie.total_results);

            let dataTv = await (await fetch(`https://api.themoviedb.org/3/search/tv?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryTv p:last").text(dataTv.total_results);

            let dataPerson = await (await fetch(`https://api.themoviedb.org/3/search/person?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryPerson p:last").text(dataPerson.total_results);

            let dataCompany = await (await fetch(`https://api.themoviedb.org/3/search/company?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryCompany p:last").text(dataCompany.total_results);


            let dataKeyword = await (await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryKeyword p:last").text(dataKeyword.total_results);


            console.log(dataMovie);
            $(".queryList").html(" ");


            if (typeQ == 'Фильмы') {
                totalPages = dataMovie.total_pages;
                total_results = dataMovie.total_results;

                let templateHtml = $('#templateQueyMovie').html();
                let template = Handlebars.compile(templateHtml);

                for (const movie of dataMovie.results) {
                    movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    let item = template(movie);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Сериалы') {
                totalPages = dataTv.total_pages;
                total_results = dataTv.total_results;

                let templateHtml = $('#templateQueyTv').html();
                let template = Handlebars.compile(templateHtml);

                for (const tv of dataTv.results) {
                    tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                    let item = template(tv);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Люди') {
                totalPages = dataPerson.total_pages;
                total_results = dataPerson.total_results;

                let templateHtml = $('#templateQueyPeople').html();
                let template = Handlebars.compile(templateHtml);

                for (const people of dataPerson.results) {
                    if (people.gender == 0) {
                        people.gender = 'Man';
                    } else {
                        people.gender = 'Woman';
                    }
                    let item = template(people);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Ключевые слова') {
                totalPages = dataKeyword.total_pages;
                total_results = dataKeyword.total_results;

                for (const words of dataKeyword.results) {
                    $(".queryList").append(`<p>${words.name}</p>`);
                }
            } else if (typeQ == 'Компании') {
                totalPages = dataCompany.total_pages;
                total_results = dataCompany.total_results;

                for (const company of dataCompany.results) {
                    $(".queryList").append(`<p>${company.name}</p>`);
                }
            }

            total_results = Math.ceil(total_results / 20);

            if (total_results == 0) {
                $('#downloadMoreQuery').hide();
            }

            //     <div class="queryResult">
            //     <img src="./images/banana.jpg">
            //     <div class="info">
            //         <h5>Hulk</h5>
            //         <small>19 июня 2003</small>
            //         <p id="description">Lorem ipsum dolor sem ipsum em ipsum dolor sem ipsum dolor sem ipsum dolor sem ipsum dolor sdem ipsum dolor sem ipsum dolor solor sem ipsum dolor sit amet consectetur adipisicing elit. Similique tempore voluptatum iusto dolorum
            //             expedita perspiciatis consequatur dolore quos deleniti quisquam?</p>
            //     </div>
            // </div>
        }
    }
});

$('#downloadMoreQuery').click(async function() {
    page++;

    await loadNewItems(page, typeQ, searchQ);
    $('#downloadMoreQuery').hide();

})


async function loadNewItems(page = 1, type, searchQ) {

    // console.log(dataCompany);
    //  $(".queryList").html();
    console.log("\n\n\n\n\n");
    console.log(type);
    console.log("\n\n\n\n\n");

    if (type == 'Фильмы') {
        let dataMovie = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryMovie p:last").text(dataMovie.total_results);
        totalPages = dataMovie.total_pages;
        total_results = dataMovie.total_results;


        let templateHtml = $('#templateQueyMovie').html();
        let template = Handlebars.compile(templateHtml);

        for (const movie of dataMovie.results) {
            if (movie.poster_path) {
                movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            } else {
                movie.poster_path = '/images/notImg.png';
            }

            let item = template(movie);
            $(".queryList").append(item);
        }
    } else if (type == 'Сериалы') {
        let dataTv = await (await fetch(`https://api.themoviedb.org/3/search/tv?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryTv p:last").text(dataTv.total_results);
        totalPages = dataTv.total_pages;
        total_results = dataTv.total_results;


        let templateHtml = $('#templateQueyTv').html();
        let template = Handlebars.compile(templateHtml);

        for (const tv of dataTv.results) {
            tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
            let item = template(tv);
            $(".queryList").append(item);
        }
    } else if (type == 'Люди') {
        let dataPerson = await (await fetch(`https://api.themoviedb.org/3/search/person?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryPerson p:last").text(dataPerson.total_results);
        totalPages = dataPerson.total_pages;
        total_results = dataPerson.total_results;


        let templateHtml = $('#templateQueyPeople').html();
        let template = Handlebars.compile(templateHtml);

        for (const people of dataPerson.results) {
            if (people.gender == 0) {
                people.gender = 'Man';
            } else {
                people.gender = 'Woman';
            }
            let item = template(people);
            $(".queryList").append(item);
        }
    } else if (type == 'Ключевые слова') {
        let dataKeyword = await (await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryKeyword p:last").text(dataKeyword.total_results);
        totalPages = dataKeyword.total_pages;
        total_results = dataKeyword.total_results;


        for (const words of dataKeyword.results) {
            $(".queryList").append(`<p>${words.name}</p>`);
        }
    } else if (type == 'Компании') {
        let dataCompany = await (await fetch(`https://api.themoviedb.org/3/search/company?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryCompany p:last").text(dataCompany.total_results);
        totalPages = dataCompany.total_pages;
        total_results = dataCompany.total_results;


        for (const company of dataCompany.results) {
            $(".queryList").append(`<p>${company.name}</p>`);
        }
    }

    total_results = Math.ceil(total_results / 20);


}