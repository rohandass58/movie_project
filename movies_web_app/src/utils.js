export const stars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1!== 0? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  let stars = '';
  for (let i = 0; i < fullStars; i++) {
    stars += '⭐';
  }
  for (let i = 0; i < halfStars; i++) {
    stars += '✰';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '☆';
  }

  return stars;
};
