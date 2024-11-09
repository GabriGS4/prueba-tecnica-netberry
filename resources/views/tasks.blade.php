<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"/>

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/pages/Tasks.js', 'resources/js/config/dataTables.tailwindcss.js', 'resources/css/datatables.css'])
    @endif
    @routes
</head>
<body class="font-sans antialiased dark:bg-gray-700 dark:text-white/50">
    <div class="bg-gray-800 text-white px-6 py-4">
        <h2 class="text-xl font-bold">Gestor de Tareas</h2>
    </div>
    <form id="form_new_task" class="mx-5 my-10 space-y-4 md:grid md:grid-cols-8 md:space-y-0 md:gap-4">
        <!-- Input de tarea -->
        <input type="text" id="name" name="name" class="col-span-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nueva Tarea..." required />

        <!-- Categorías -->
        <div class="col-span-2 flex flex-wrap gap-2 justify-center items-center">
            @foreach($categories as $category)
                <div class="flex items-center mx-3">
                    <input id="category-{{$category->id}}" name="category-{{$category->id}}" type="checkbox" class="w-4 h-4 checkbox">
                    <label for="category-{{$category->id}}" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$category->name}}</label>
                </div>
            @endforeach
        </div>

        <!-- Botón Añadir -->
        <button id="btnNewTask" type="button" class="w-full md:col-span-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Añadir</button>

    </form>

    <div class=" mx-5 my-10 bg-gray-300 rounded-xl shadow-md overflow-hidden">
        <div class="bg-gray-800 text-white px-6 py-4">
            <input type="text" name="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." />

        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table id="table"
                   class="low-x-auto shadow-md sm:rounded-lgn">
            </table>
        </div>
    </div>

</body>
</html>
