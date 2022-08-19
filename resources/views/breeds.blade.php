@extends('layouts.app')

@section('class', 'pokedex-background')

@section('content')
<div class="list">
  <pokedex-profile :pokemon-id="{{$id}}"/>
</div>
@endsection
