/*! DataTables Tailwind CSS integration
 */
import jQuery from 'jquery';
import DataTable from 'datatables.net-dt';

(function( factory ){
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net'], function($) {
            return factory($, window, document);
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        var cjsRequires = function(root, $) {
            if (!$.fn.dataTable) {
                require('datatables.net')(root, $);
            }
        };

        if (typeof window === 'undefined') {
            module.exports = function(root, $) {
                if (!root) {
                    // CommonJS environments without a window global must pass a
                    // root. This will give an error otherwise
                    root = window;
                }

                if (!$) {
                    $ = jQuery(root);
                }

                cjsRequires(root, $);
                return factory($, root, root.document);
            };
        } else {
            cjsRequires(window, jQuery);
            module.exports = factory(jQuery, window, window.document);
        }
    } else {
        // Browser
        factory(jQuery, window, document);
    }
}(function( $, window, document ) {
    'use strict';
    var DataTable = $.fn.dataTable;



    /*
     * This is a tech preview of Tailwind CSS integration with DataTables.
     */

// Set the defaults for DataTables initialisation
    $.extend( true, DataTable.defaults, {
        renderer: 'tailwindcss'
    } );


// Default class modification
    $.extend( true, DataTable.ext.classes, {
        container: "dt-container dt-tailwindcss",
        search: {
            input: "input input-sm",
        },
        length: {
            select: "select select-sm",
        },
        processing: {
            container: "dt-processing"
        },
        paging: {
            active: 'btn disabled bg-gray-200',
            notActive: 'bg-transparent',
            button: 'btn',
            enabled: 'btn',
            notEnabled: 'text-gray-300 dark:text-gray-600'
        },
        table: 'dataTable min-w-full text-sm align-middle whitespace-nowrap',
        thead: {
            row: 'border-b border-gray-100 dark:border-gray-700/50',
            cell: 'px-3 py-4 text-gray-900 bg-gray-100/75 font-semibold text-left dark:text-gray-50 dark:bg-gray-700/25'
        },
        tbody: {
            row: '',
            cell: 'p-3'
        },
        tfoot: {
            row: 'even:bg-gray-50 dark:even:bg-gray-900/50',
            cell: 'p-3 text-left'
        },
    } );

    DataTable.ext.renderer.pagingButton.tailwindcss = function (settings, buttonType, content, active, disabled) {
        var classes = settings.oClasses.paging;
        var btnClasses = [classes.button];

        btnClasses.push(active ? classes.active : classes.notActive);
        btnClasses.push(disabled ? classes.notEnabled : classes.enabled);

        var a = $('<a>', {
            'href': disabled ? null : '#',
            'class': btnClasses.join(' ')
        })
            .html(content);

        return {
            display: a,
            clicker: a
        };
    };

    DataTable.ext.renderer.pagingContainer.tailwindcss = function (settings, buttonEls) {
        var classes = settings.oClasses.paging;

        buttonEls[0].addClass(classes.first);
        buttonEls[buttonEls.length -1].addClass(classes.last);

        return $('<ul/>').addClass('pagination').append(buttonEls);
    };

    DataTable.ext.renderer.layout.tailwindcss = function ( settings, container, items ) {
        var row = $( '<div/>', {
            "class": items.full ?
                'grid grid-cols-1 gap-4 mb-4' :
                'grid grid-cols-2 gap-4 mb-4'
        } )
            .appendTo( container );

        $.each( items, function (key, val) {
            var klass;

            // Apply start / end (left / right when ltr) margins
            if (val.table) {
                klass = 'col-span-2';
            }
            else if (key === 'start') {
                klass = 'justify-self-start';
            }
            else if (key === 'end') {
                klass = 'col-start-2 justify-self-end';
            }
            else {
                klass = 'col-span-2 justify-self-center';
            }

            $( '<div/>', {
                id: val.id || null,
                "class": klass + ' ' + (val.className || '')
            } )
                .append( val.contents )
                .appendTo( row );

        } );
    };


    return DataTable;
}));
