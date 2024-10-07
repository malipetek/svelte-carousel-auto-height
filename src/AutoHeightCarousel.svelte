<script>
	import Carousel from '../svelte-carousel/src/main';
	let carouselEl;

	function resize({index, currentSlide}) {
			const trackContainer = carouselEl.querySelector('.sc-carousel__pages-window');
		if(!isNaN(+index)) {
			const slides = [...trackContainer.firstElementChild.children];
				currentSlide = slides[index]; 
			}
			const height = currentSlide.scrollHeight;
			trackContainer.style.maxHeight = height + 'px';
	}
	
	let resizedOnce = false;
	$: if(carouselEl && !resizedOnce) {
		resizedOnce = true;
		const trackContainer = carouselEl.querySelector('.sc-carousel__pages-window');
		const slides = [...trackContainer.firstElementChild.children];
		
		const observer = new IntersectionObserver((entries) => {
    const visibleSlides = entries.filter((entry) => entry.isIntersecting).map(entry => entry.target);
    const currentSlide = visibleSlides[0];
		if(!currentSlide) {
			return 1;
		}
		resize({currentSlide});
			}, {
				root: trackContainer,
				rootMargin: '0px',
				threshold: 0.1,
			});
		
		slides.forEach((slide) => {
			observer.observe(slide);
		});
	}
  
  let cls = '';
  export { cls as class };

</script>

<div class="{cls}" bind:this={carouselEl}>
    <Carousel
			{...$$props}
			on:pageChange={(e) => {
        try {
          $$props.pageChange && $$props.pageChange(e);
        }
        catch(err) {
          console.error(err)
        }
				resize({index: e.detail + 1});
			}}
		>
			<slot />
    </Carousel>
</div>

<style>
	:global(.sc-carousel__pages-window) {
		transition: max-height 0.3s ease-in;
	}
	:global(.sc-carousel__pages-window > * > *) {
		height: min-content;
	}
</style>