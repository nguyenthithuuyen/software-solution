require([
    'jquery'
], function($) {
    $(document).ready(function() {
        $(".cms-software-solution  .banner-bottom-service-soft").insertAfter(".cms-software-solution .page-main");

        var maxRow = $('.cms-software-solution .t-business-best').eq(0).children().length
        jQuery('.cms-software-solution .t-business-best').map(function() {
            if (maxRow < jQuery(this).children().length) {
                maxRow = jQuery(this).children().length;
            }
            return maxRow;
        })
        for (let i = 0; i < maxRow; i++) {
            setMaxHeight('.cms-software-solution .t-business-best > *:nth-of-type(' + (i + 1) + ')', 3);
        }
        $(window).resize(function() {

            for (let i = 0; i < maxRow; i++) {
                setMaxHeight('.cms-software-solution .t-business-best > *:nth-of-type(' + (i + 1) + ')', 3);
            }
        });
        setMaxHeight('.cms-software-solution .th-col', 3);
        $(window).resize(function() {
            setMaxHeight('.cms-software-solution .th-col', 3);
        });
        setMaxHeight('.cms-software-solution .title-solution', 1);
        $(window).resize(function() {
            setMaxHeight('.cms-software-solution .title-solution', 1);
        });
        setMaxHeight('.cms-software-solution .title-solution-SDMS', 1);
        $(window).resize(function() {
            setMaxHeight('.cms-software-solution .title-solution-SDMS', 1);
        });
        setMaxHeight('.cms-software-solution .solution', 1);
        $(window).resize(function() {
            setMaxHeight('.cms-software-solution .solution', 1);
        });


        if( jQuery('.cms-software-solution').length ) {
            (function(){
                let breakTab = 991;
                let checkStickyApply = false;
                let intervalBanner = 0;
                let timerInterval = setInterval(function() {
                    intervalBanner++;
                    if( jQuery('.rev_slider_wrapper .rev-slider').length && jQuery('.rev_slider_wrapper .rev-slider').height() > 0 ){
                        __sticky('body', '.tab-list');
                        checkStickyApply = true;
                        clearInterval(timerInterval);
                    }
                    if ( intervalBanner > 20 && !checkStickyApply ){
                        __sticky('body', '.tab-list');
                        clearInterval(timerInterval);
                    }
                }, 100);



                jQuery('.tab-list').delegate('.tab', 'click', function() {
                    let index = jQuery('.tab').index(jQuery(this)) + 1;
                    jQuery('.tab').removeClass('active');
                    jQuery(this).addClass('active');

                    if( jQuery(window).width() < breakTab ){
                        jQuery('.tab-list .options').slideUp(400, function(){
                            jQuery('html, body').animate({
                                scrollTop: jQuery("#tab-" + index).offset().top - jQuery('header').outerHeight() - jQuery('.tab-list').outerHeight()
                            }, 400);
                        });
                        jQuery('.tab-list .selected').html(jQuery('.tab-list .tab.active').text());
                        jQuery('.tab-list .selected').removeClass('active');
                    } else {
                        jQuery('html, body').animate({
                            scrollTop: jQuery("#tab-" + index).offset().top - jQuery('header').outerHeight() - jQuery('.tab-list').outerHeight()
                        }, 400);
                    }

                    return false;
                });

                var tabListEl = jQuery('.tab-list').html();
                var cloneSelected = false;
                if( jQuery(window).width() < breakTab ){
                    dropDownTab();
                } else {
                    jQuery('.tab-list').html(tabListEl);
                    cloneSelected = false;
                }

                function dropDownTab(){
                    if( !cloneSelected ){
                        jQuery('.tab-list .tab').wrapAll('<div class="options"></div>');
                        jQuery('.tab-list').prepend("<div class='selected'>"+jQuery(".tab.active").text()+"</div>");
                        jQuery('.tab-list .options').hide();

                        jQuery('.tab-list .selected').on('click' , function(){
                            if(jQuery(this).hasClass('active')){
                                jQuery('.tab-list .options').slideUp();
                                jQuery(this).removeClass('active');
                            } else {
                                jQuery('.tab-list .options').slideDown();
                                jQuery(this).addClass('active');
                            }
                        });
                        cloneSelected = true;
                    }
                }

                jQuery(window).scroll(function(){
                    jQuery('[id^=tab-]').each(function(){
                        if (
                            jQuery(window).scrollTop() + jQuery('header').outerHeight() + jQuery('.tab-list').outerHeight() >= jQuery(this).offset().top - 1
                            && jQuery(this).offset().top + jQuery(this).outerHeight() + parseFloat(jQuery(this).css('margin-bottom')) > jQuery(window).scrollTop() + jQuery('header').outerHeight() + jQuery('.tab-list').outerHeight()
                        ){
                            jQuery('.tab-list').find('.tab.active').removeClass('active');
                            let idx = jQuery(this).attr('id').split('-')[1] - 1;
                            jQuery('.tab-list').find('.tab').eq(idx).addClass('active');

                            if( jQuery('.tab-list .selected').length ){
                                jQuery('.tab-list .selected').html(jQuery(".tab.active").text());
                            }
                        }
                    });

                    if (jQuery('[id^=tab-]').last().offset().top + jQuery('[id^=tab-]').last().outerHeight() < jQuery(window).scrollTop() + jQuery('header').outerHeight() + jQuery('.tab-list').outerHeight() ){
                        jQuery('.tab-list').find('.tab.active').removeClass('active');
                    }
                });

                jQuery(window).on('resize', function(){
                    if( jQuery(window).width() < breakTab ){
                        dropDownTab();
                    } else {
                        jQuery('.tab-list').html(tabListEl);
                        cloneSelected = false;
                    }
                })
            })()
        }



    });


    function setMaxHeight(selector, itemsInRow) {
        let $selector = jQuery(selector);
        $selector.height('auto');
        let itemsNum = $selector.length;

        if (itemsNum < 2) {
            return;
        }

        let numRow = Math.ceil(itemsNum / itemsInRow);

        for (let row = 0; row < numRow; row++) {
            let start = row * itemsInRow;
            let end = start + itemsInRow;
            end = end > itemsNum ? itemsNum : end;

            // set init height
            let tempMaxHeight = $selector.eq(start).height();

            $selector.slice(start + 1, end).map(function() {
                if (tempMaxHeight < jQuery(this).height()) {
                    tempMaxHeight = jQuery(this).height();
                }
            });
            $selector.slice(start, end).height(tempMaxHeight);
        }
    }


});