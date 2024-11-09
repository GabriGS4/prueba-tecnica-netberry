"use strict";
import {addSpinner, deleteSpinner} from "../config/global";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Swal from 'sweetalert2'
import $ from "jquery";

const Tasks = function () {
    let Options = {}
    function initTable() {
        Options.table = $('#table').DataTable({
            responsive: false,
            searchDelay: 500,
            processing: true,
            serverSide: true,
            stateSave: true,
            searching: true,
            lengthMenu: [
                [10, 50, 100, -1],
                [10, 50, 100, 'Todas']
            ],
            ajax: {
                url: route('tasks.list'),
                type: 'GET',
                data: q => {
                    q.search['value'] = document.querySelector('[name="search"]').value;
                    q.search['regex'] = false;
                    return q;
                }
            },
            columns: [
                {
                    data: "name",
                    title: 'Tarea',
                    sClass: 'text-left vertical-align-middle',
                    searchable: true,
                },
                {
                    data: "categories",
                    title: 'Categorías',
                    sClass: 'text-left vertical-align-middle',
                    searchable: true,
                },
                {
                    data: "id",
                    title: 'Acciones',
                    width: "1%",
                    sClass: 'text-right vertical-align-middle',
                    searchable: false,
                },
            ],
            columnDefs: [
                {
                    targets: [0],
                    orderable: true,
                    render: function (data, type, row) {
                        if (data === null) {
                            return `-`;
                        }
                        return data;
                    }
                },
                {
                    targets: -1,
                    orderable: false,
                    render: function (data, type, row) {
                        return `<button type="button" data-delete="${data}" class="text-red-600 border border-red-600 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    <span class="sr-only">Eliminar</span>
                                </button>`;
                    }
                }
            ],
            order: [
                [0, "desc"]
            ],
            scrollX: true,
            drawCallback: function (settings) {
                $('.dt-container').addClass('text-gray-800');
            },
            dom: "<'w-full'tr>" + "<'flex justify-between items-center px-4 py-2'<' flex flex-col justify-center align-middle items-center text-left text-[12px]'l><'w-1/2 text-[12px] flex flex-col md:flex-row justify-end align-middle items-center text-right'i p>>"
        });
        Options.table.on('draw', function () {
            let deleteButtons = document.querySelectorAll('[data-delete]');
            deleteButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    deleteTask(button.getAttribute('data-delete'));
                });
            });
        });

        let searchInput = document.querySelector('[name="search"]');
        if (searchInput) {
            searchInput.addEventListener('input', _ => Options.table.ajax.reload(null, true));
        }
    }

    function deleteTask(id) {
        Swal.fire({
            title: '¿Estás seguro de eliminar la tarea?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                axios.delete(route('tasks.delete', [id]))
                    .then(function (response) {

                        if (!response.data.status) {
                            toastr.error(response.data.message, 'Error');
                            return false;
                        }
                        toastr.success(response.data.message, 'Correcto');
                        Options.table.ajax.reload();

                    })
                    .catch(function (error) {
                        console.log(error.response);
                        toastr.error('Ocurrió un error al intentar eliminar la tarea', 'Error');
                    });
            }
        });
    }
    function storeTask() {
        let that = this;
        let form = that.closest('form');
        let formData = new FormData(form);
        addSpinner(that);

        axios.post(route('tasks.store'), formData)
            .then(response => {
                if (!response.data.status) {
                    toastr.error(response.data.message);
                    console.log(response.data.errors);
                    return false;
                }

                toastr.success(response.data.message);
                Options.table.ajax.reload();
            })
            .catch(error => {
                console.log(error.response);
                toastr.error('Ocurrió un error al intentar guardar la tarea');
            }).finally(() => {
            deleteSpinner(that);
        });
    }
    function initEventListeners() {
        const newTaskButton = document.querySelector('#btnNewTask');
        if (newTaskButton) {
            newTaskButton.addEventListener('click', storeTask);
        }
    }
    function init() {
        initTable();
        initEventListeners();
    }
    return {
        init
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    Tasks.init();
});
