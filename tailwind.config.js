/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'profile-blob': "url(./assets/profile__blob.svg)",
        'profile-wave': "url(./assets/profile__wave.svg)",
        'profile-poly': "url(./assets/profile__poly.svg)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
