(function($) {

    $.fn.percentageLoader = function(options) {

        this.each(function() {
            var $this = $(this);
            //配置项
            var config = $.extend({}, $.fn.percentageLoader.defaultConfig, options);

            var val = parseInt($this.children(config.valElement).text()),
                init = true,
                speed = 200,
                w = parseInt($this.css('width')),
                h = parseInt($this.css('height')),
                rx = w / 2,
                ry = h / 2,
                r = rx - config.strokeWidth / 2 - 1.55, //修正VML strokeWidth
                z = null,
                txt = null,
                dstop = null;

            var paper = Raphael(this, w, h);

            function minit() {
                //构造圆环
                //自定义arc属性，传入进度值80%，总份数100%，半径80
                paper.customAttributes.arc = function(value, total, R) {
                    var alpha = 360 / total * value, //角度
                        a = (90 - alpha) * Math.PI / 180, //弧度
                        x = rx + R * Math.cos(a),
                        y = ry - R * Math.sin(a),
                        path;
                    if (total == value) {
                        path = [
                            ["M", rx, ry - R],
                            ["A", R, R, 0, 1, 1, rx - 0.01, ry - R]
                            //半长轴，
                            //半短轴，
                            //x轴与水平线夹角
                            //1代表大角度弧线，0代表小角度弧线
                            //1代表顺时针画弧，0代表逆时针
                            //结束点的x，y坐标
                        ];
                    } else {
                        path = [
                            ["M", rx, ry - R],
                            ["A", R, R, 0, +(alpha > 180), 1, x, y]
                        ];
                    };

                    return {
                        path: path
                    };
                };
                //绘制背景圆环
                paper.path().attr({
                    arc: [100, 100, r],
                    'stroke-width': config.strokeWidth,
                    'stroke': config.bgColor
                });
                if (!!val) {
                    z = paper.path().attr({
                        arc: [0.01, 100, r],
                        'stroke-width': config.strokeWidth,
                        'stroke': config.ringColor,
                        'cursor': "pointer"
                    });
                    updateVal(val, 100, r, z, 2);
                }

                txt = paper.text(rx, ry, val + "%").attr({
                    font: config.fontWeight + " " + config.fontSize + " Arial",
                    fill: config.textColor
                });
            };
            minit();
            // //色谱
            // function getColor(size) {
            //  var arr = [];
            //  for (var i = 0; i <= 255; i++) {
            //      arr.push("rgb(" + i + "," + (255 - i) + "," + 0 + ")");
            //  }
            //  console.log(arr);
            //  return arr[parseInt(size * 2.55)];
            // };
            //环形动起来和事件绑定
            function updateVal(value, total, R, hand, id) {
                if (init) {
                    hand.animate({
                        arc: [value, total, R]
                    }, 900, ">");
                } else {
                    if (!value || value == total) {
                        value = total;
                        hand.animate({
                            arc: [value, total, R]
                        }, 750, "bounce", function() {
                            hand.attr({
                                arc: [0, total, R]
                            });
                        });
                    } else {
                        hand.animate({
                            arc: [value, total, R]
                        }, 750, "elastic");
                    }
                }
            };

        });

    };
    //默认值
    $.fn.percentageLoader.defaultConfig = {
        valElement: 'p',
        strokeWidth: 20,
        bgColor: '#d9d9d9',
        ringColor: '#d53f3f',
        textColor: '#9a9a9a',
        fontSize: '12px',
        fontWeight: 'normal'
    };

})(jQuery);


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


function downloadItem(list, template, data) {
    let populars = $(list);
    populars.html("");

    let templateHtml = $(template).html();
    var template = Handlebars.compile(templateHtml);

    for (const item of data.results) {
        item.vote_average *= 10;
        let movie = template(item);
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


// $('.popularsTrails .item').click(function(e) {
//     e.preventDefault();
//     console.log(this);
//     $(this).find('iframe').css('width', 400);
//     $(this).find('iframe').css('height', 400);
// });



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
$('.blackFon').hide();

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
$('.searchMovie').hide();
$('.subMenyu').hide();

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
$('#zoomPhoto').hide();
$('.img').click(function() { //zooom
    //   $(event.target).find('#zoomPhoto').attr('src', `https://image.tmdb.org/t/p/w500/8jNFfNmqHVqLHnGnxgu7y8xgRIa.jpg"`);

    $('.blackFon').show();
    $('#zoomMovie').attr('src', $('#fontImg').attr('src'));
    $('#zoomPhoto').show();
    //$('#zoomPhoto').attr('src', '');
})




$('#lookTrailer').click(function() { //Look trailer
    console.log(200);


    let url = $(this).find('#url').text();
    console.log(url);


    $('body').append('<iframe width="900" height="615" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $('.blackFon').show();
    $('iframe').attr('src', "");
    $('iframe').attr('src', url);


});




//////////////////////////////////////////////////////////////////////////////////////////////////////

$('#detailContent').hide();

$('#returnHome').click(function() {
    $('#mainContent').show();
    $('#detailContent').hide();
});

$('.populars').click(function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    console.log(id);
    if ($(event.target).attr('data-id')) {
        getInfo(id, type);
    }


    //  getInfo('335983', 'movie');


})

async function getInfo(id, type) {
    let data = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();

    //console.log(999);
    //console.log(data);
    if (data != null) {
        $('#mainContent').hide();
        $('#detailContent').show();
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
            $('#detailContent').find('#url').text(`https://www.youtube.com/embed/${movie.results[0].key}`);


            $('#detailContent').find('#fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.poster_path}`);
            $('#detailContent').find('#imgPath').css('background-image', `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`);




            let dataActors = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();

            console.log("-------------------------------\n\n");
            console.log(dataActors);
            let list = $('.ListActors');
            list.html("");

            let templateHtml = $('#templateActors').html();
            let template = Handlebars.compile(templateHtml);



            for (const item of dataActors.cast) {
                if (item.gender == 2) {
                    item.gender = "Man"
                } else {
                    item.gender = "Woman"
                }
                let actor = template(item);

                list.append(actor);

            }

        } else if (type == 'tv') {
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
            $('#detailContent').find('#url').text(`https://www.youtube.com/embed/${movie.results[0].key}`);


            $('#detailContent').find('#fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.poster_path}`);
            $('#detailContent').find('#imgPath').css('background-image', `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`);




            let dataActors = await (await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US`)).json();

            console.log("-------------------------------\n\n");
            console.log(dataActors);
            let list = $('.ListActors');
            list.html("");

            let templateHtml = $('#templateActors').html();
            let template = Handlebars.compile(templateHtml);



            for (const item of dataActors.cast) {
                if (item.gender == 2) {
                    item.gender = "Man"
                } else {
                    item.gender = "Woman"
                }
                let actor = template(item);

                list.append(actor);

            }
        }



    }

    //console.log(dataActors);
    console.log(data);
}




//https://api.themoviedb.org/3/movie/335983?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US
//https://api.themoviedb.org/3/movie/580489/credits?api_key=9d005c81618cf4d45a9f6977b2d85774&language=en-US
