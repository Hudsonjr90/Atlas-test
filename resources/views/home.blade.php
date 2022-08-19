@extends('layouts.app')

@section('class', 'home-background')

@section('content')
<section class="home pokeatlas-container">
  <div class="home__content">
    <h1 class="home__title">Pokedex</h1>

    <h3 class="home__description">
      Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more! Search for a Pokémon by name or using its National Pokédex number.
    </h3>

    <div class="home__button-container">
      <a class="home-button" href="list">Seach Pokemon</a>
    </div>
  </div>

  <div class="home__carousel carousel">
    <div class="carousel__images">
      <img id="carousel-image-1" class="carousel__image-item carousel__image-item--1" src="{{URL::asset('/images/carousel/1.png')}}" alt="Venusaur">
      <img id="carousel-image-2" class="carousel__image-item carousel__image-item--2" src="{{URL::asset('/images/carousel/2.png')}}" alt="Charizard">
      <img id="carousel-image-3" class="carousel__image-item carousel__image-item--3" src="{{URL::asset('/images/carousel/3.png')}}" alt="Blastoise">
    </div>

    <div class="carousel__control">
      <span id="carousel-control-1" class="carousel__control-item carousel__control-item--1"></span>
      <span id="carousel-control-2" class="carousel__control-item carousel__control-item--2"></span>
      <span id="carousel-control-3" class="carousel__control-item carousel__control-item--3"></span>
    </div>
  </div>
</section>
@endsection

<script>
const carousel = {
  currentImage: 1,
  changeImageInterval: null,
  handleClickControl: (imageId) => {
    carousel.startNewInterval()
    carousel.scrollCarousel(imageId)
  },
  scrollCarousel: (imageId) => {
    const lastControl = document.getElementById(`carousel-control-${carousel.currentImage}`)
    if (lastControl) {
      lastControl.classList.remove('carousel__control-item--checked')
    }

    carousel.currentImage = imageId

    const image = document.getElementById(`carousel-image-${imageId}`)
    image.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });

    document.getElementById(`carousel-control-${imageId}`).classList.add('carousel__control-item--checked')
  },
  startListeners: () => {
    const controlList = document.querySelector('.carousel .carousel__control')
    for (const controlItem of controlList.children) {
      const itemId = controlItem.id.replace('carousel-control-', '')

      controlItem.addEventListener('click', () => carousel.handleClickControl(itemId))
    }
  },
  startNewInterval: () => {
    if (carousel.changeImageInterval) {
      clearInterval(carousel.changeImageInterval)
    }

    const carouselImages = document.querySelector('.carousel .carousel__images')
    carousel.changeImageInterval = setInterval(() => {
      let nextImage = carousel.currentImage+1
      if (nextImage > carouselImages.children.length) {
        nextImage = 1
      }

      carousel.scrollCarousel(nextImage)
    }, 5000);
  }
}

window.onload = () => {
  carousel.scrollCarousel(1)
  carousel.startListeners()
  carousel.startNewInterval()
}
</script>
