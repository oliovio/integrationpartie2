<script setup>
const reviews = [
  {
    id: 2,
    content: "This equipment management system has transformed the way we handle our business. The tracking and maintenance systems provide invaluable support to our team.",
    author: "Micheal Afton",
    role: "Owner / Chief Manager",
    company: "Fazbear Entertainment LLC.",
    rating: 5,
    image: "https://www.pearlanddean.com/wp-content/uploads/2025/01/uuiddaef48c6-a2ca-4abb-aa2e-ca357af7dd12groupId10139t1738321880754.jpg"
  },
  {
    id: 1,
    content: "Le dashboard donne une idée claire du status de enos équipement. C'est une grande optimisation de nos ressources.",
    author: "Michel Troo",
<<<<<<< HEAD
    role: "Gestionnaire des Opérations",
    company: "Type Acier Ltd.",
=======
    role: "Operations Manager",
    company: "Global Systems Ltd.",
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
    rating: 5,
    image: "https://www.geek-days.com/wp-content/uploads/2022/09/Fildrong-500x500-1.jpg"
  },
  {
    id: 3,
    content: "Le suivi de notre horaire est maintenant plus facile que jamais. Ce système nous a permit de réduire de 40% le temps d'inopérabilité de nos équipements.",
    author: "Matthew Patthew",
    role: "Leader IT",
    company: "JustaTheory LLC",
    rating: 4,
    image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/22378734/MatPat_headshot.jpg?quality=90&strip=all&crop=21.875%2C0%2C56.25%2C100&w=2400"
  }
];
</script>

<template>
  <div class="bg-gray-50 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Trusted by Industry Leaders
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          Here's what CortexIT clients have to say about our IT equipment management system.
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div v-for="review in reviews" :key="review.id" class="flex flex-col bg-white ring-1 ring-gray-200 rounded-2xl p-8 transform transition duration-500 hover:scale-105">
          <div class="flex items-center gap-x-4 mb-4">
            <img :src="review.image" alt="" class="h-12 w-12 rounded-full bg-gray-50">
            <div>
              <h3 class="font-semibold text-gray-900">{{ review.author }}</h3>
              <p class="text-sm leading-6 text-gray-600">{{ review.role }}</p>
            </div>
          </div>
          <div class="flex items-center mb-4">
            <div class="flex items-center">
              <template v-for="star in review.rating" :key="star">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </div>
          </div>
          <blockquote class="text-sm leading-6 text-gray-600 flex-grow">
            "{{ review.content }}"
          </blockquote>
          <p class="mt-4 text-sm text-gray-600">{{ review.company }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
