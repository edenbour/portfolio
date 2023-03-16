<script setup>
import { collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { onMounted, ref } from 'vue';
import HomeCardProjet from '@/component/HomeCardProjet.vue'
import HomeCardLogo from '@/component/HomeCardLogo.vue'
import { getDownloadURL, getStorage, ref as fref } from '@firebase/storage';



let data = ref([])
let logos = ref([])
onMounted(async () => {
  const firestore = getFirestore()
  let q = query(collection(firestore, "projets"), where("IsHomepage", "==", true))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.value.push({ id: doc.id, ...doc.data() })
  });
  for (let i = 0; i < data.value.length; i++) {
    const storage = getStorage();
    const spaceRef = fref(storage, data.value[i].imagePres);
    await getDownloadURL(spaceRef)
      .then((url) => {
        data.value[i].imagePres = url;
      })
  }
  q = query(collection(firestore, "logos"), where("IsHomepage", "==", true))
  const querySnapshotL = await getDocs(q);
  querySnapshotL.forEach((doc) => {
    logos.value.push({ id: doc.id, ...doc.data() })
  });
  for (let i = 0; i < logos.value.length; i++) {
    const storage = getStorage();
    const spaceRef = fref(storage, logos.value[i].image);
    await getDownloadURL(spaceRef)
      .then((url) => {
        logos.value[i].image = url;
      })
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // console.log(logos.value)
})
</script>

<template>
  <div class="border-b pb-10 mb-10 relative">
    <span
      class="absolute top-[15%] left-1/2 h-20 w-20 bg-white bg-opacity-5 backdrop-blur-md z-10 border-2 rounded-full  hidden md:flex"
      data-aos="zoom-in-left" data-aos-delay="600" data-aos-duration="2000"></span>
    <span
      class="absolute top-1/3 left-[15%] h-24 w-24 bg-white bg-opacity-5 backdrop-blur-md z-10 border-2 rounded-full hidden md:flex"
      data-aos="zoom-in-left" data-aos-delay="400" data-aos-duration="2000"></span>
    <h1 class="flex flex-col text-2xl md:text-6xl lg:text-8xl xl:text-9xl uppercase">
      <span class="flex" data-aos="fade-up" data-aos-duration="2000">Web design</span>
      <span class="flex items-center lg:-mt-12" data-aos="fade-up" data-aos-delay="150" data-aos-duration="2000">Graphic
        d<img src="/ball.png" class="-mx-2 md:-mx-6 lg:-mx-12 xl:-mx-14 h-10 md:h-24 lg:h-44 xl:h-56" />sign</span>
      <span class="flex items-center lg:-mt-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="2000">Log
        <img src="/QanticLogo.png" class="h-5 md:h-14 lg:h-20 xl:h-24" />s</span>
      <span class="flex" data-aos="fade-up" data-aos-delay="450" data-aos-duration="2000">Product</span>
    </h1>
    <div class="flex">
      <div class="uppercase gap-9 text-xs font-helveticaNeueThin hidden lg:flex">
        <div class="flex flex-col" data-aos="fade-right" data-aos-delay="600" data-aos-duration="2000">
          <p>French graphic designer</p>
          <p>Based in France</p>
          <p>Montbéliard</p>
        </div>
        <div class="flex flex-col" data-aos="fade-right" data-aos-delay="1600" data-aos-duration="2000">
          <p>19 years old designer still</p>
          <p>studying for a diploma</p>
          <p>hoping to do a master in visuel</p>
          <p>and branding identity</p>
        </div>
        <div class="flex flex-col" data-aos="fade-right" data-aos-delay="2600" data-aos-duration="2000">
          <p>Experienced in adobe</p>
          <p>photoshop, illustrator,</p>
          <p>indesign, audition, XD,</p>
          <p>premiere, figma</p>
        </div>
      </div>
      <div class="text-2xl md:text-6xl lg:text-8xl xl:text-9xl lg:-mt-8 uppercase" data-aos="fade-left"
        data-aos-delay="1050" data-aos-duration="2000">
        Design
      </div>
    </div>
  </div>
  <div class="border-b pb-10 mb-10 relative w-full overflow-hidden">
    <div class="flex uppercase gap-10 md:gap-20 text-xs font-helveticaNeueThin mb-8 md:mb-0">
      <div class="flex flex-col">
        <div data-aos="fade-right" data-aos-duration="1500">
          <p>You can also see my other</p>
          <p>project in the "projects" tab</p>
          <p class="mt-2">my other creation can be</p>
          <p>found all around the website</p>
          <p>make sure to look at it !</p>
        </div>
        <div class="flex items-center gap-4 mt-4">
          <img src="/Flower.svg" alt="" class="h-8 " data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
          <img src="/sun.svg" alt="" class="h-8" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="600">
        </div>
      </div>
      <div class="flex flex-col" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1500">
        <p>the projects present in this</p>
        <p>section are from 2022 & 2023</p>
      </div>
    </div>
    <span
      class="absolute bottom-1/4 lg:top-1/4 left-2/3 h-14 w-14 md:h-20 md:w-20 lg:h-32 lg:w-32 bg-white bg-opacity-5 backdrop-blur-md z-10 border-2 rounded-full "
      data-aos="zoom-in-left" data-aos-delay="450" data-aos-duration="1500"></span>
    <span
      class="absolute top-2/3 left-[40%] md:h-16 md:w-16 lg:h-24 lg:w-24 bg-white bg-opacity-5 backdrop-blur-md z-10 border-2 rounded-full hidden md:flex"
      data-aos="zoom-in-left" data-aos-delay="800" data-aos-duration="1500"></span>
    <h2 class="text-5xl md:text-9xl lg:text-[10rem] uppercase leading-none text-end flex flex-col ">
      <span data-aos="fade-left"
          data-aos-duration="2000">Selected</span> <span data-aos="fade-left"
          data-aos-duration="2000" data-aos-delay="500" class="lg:-mt-7">Projects</span>
    </h2>
  </div>
  <div class="flex flex-col gap-6 mb-6 ">
    <HomeCardProjet v-for="projet in data" :nom="projet.nom" :tags="projet.tags" :image="projet.imagePres"
      :id="projet.id" />
  </div>
  <div class="pb-10 mb-10 relative overflow-hidden">
    <span
      class="absolute top-1/4 left-1/4 h-20 w-20 bg-white bg-opacity-5 backdrop-blur-md z-10 border-2 rounded-full hidden md:flex"
      data-aos="zoom-in-right" data-aos-delay="700" data-aos-duration="2000"></span>
    <h2 class="text-5xl md:text-9xl lg:text-[10rem] uppercase leading-none flex flex-col" >
      <span data-aos="fade-right"
        data-aos-duration="2000">Selected</span> <span data-aos="fade-right"
        data-aos-duration="2000" data-aos-delay="300" class="lg:-mt-7">Logos</span>
    </h2>
    <div class="flex flex-col items-end w-4/5 mx-auto md:-mt-5 lg:-mt-20">
      <div class="w-1/2 ">
        <p class="text-xs md:text-base font-helveticaNeueThin"  data-aos="fade-left" data-aos-delay="200"
        data-aos-duration="2000">IN ADDITION TO THE CONSTRUCTED PROJECTS I EXECUTE, I ALSO
          PRODUCE OTHER DESIGNS
          USING ADOBE
          ILLUSTRATOR TO SHOWCASE THE IDEAS AND CONCEPTS OF A BUSINESS, INDIVIDUAL, OR AS AN EXTENSION OF PROJECTS.</p>
        <div class="flex items-center gap-4 mt-4">
          <img src="/Flower.svg" alt="" class="h-8 "  data-aos="fade-left" data-aos-delay="400"
        data-aos-duration="2000">
          <img src="/sun.svg" alt="" class="h-8"  data-aos="fade-left" data-aos-delay="600"
        data-aos-duration="2000">
        </div>
      </div>

    </div>
  </div>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mx-auto gap-10 mb-10 text-xs">
    <HomeCardLogo v-for="logo in logos" :num="logo.numero" :image="logo.image" :smallDesc="logo.smallDesc" :id="logo.id"
      :largeDesc="logo.largeDesc" data-aos="fade-up" data-aos-duration="2000" />
  </div>
  <div
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mx-auto gap-10 pb-20 border-b text-xs font-helveticaNeueThin overflow-hidden">
    <p class="w-2/3" data-aos="fade-up" data-aos-duration="2000">THOSE LOGOS ARE FROM 2022 AND 2023 ONLY, I DID NOT
      DISPLAY ANYTHING BEFORE THAT</p>
    <p class="w-2/3 flex flex-col gap-2" data-aos="fade-up" data-aos-delay="600" data-aos-duration="2000">MOST OF THOSE
      LOGOS ARE FOR
      SCHOOL PROJECT OR PERSONAL PROJECT
      <span>THEY ONLY SERVE THE PURPOSE
        OF EXHIBITION</span>
    </p>
    <p class="w-2/3" data-aos="fade-up" data-aos-delay="1200" data-aos-duration="2000">EVEN IF THOSE LOGO ARE ONLY FOR
      PERSONAL PURPOSE I OWN THEM</p>
  </div>
</template>