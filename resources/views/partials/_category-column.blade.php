@if(!$categories->isEmpty())
    @foreach($categories as $category)
        <span
            class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1  text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{$category->name}}</span>
    @endforeach
@else
    <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Sin categorías</span>
@endif
