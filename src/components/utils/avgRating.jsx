export default function getAvgRating(ratingArr){
    if(ratingArr.length===0) return 0;
    const toatlReviewCount = ratingArr.reduce((acc,curr)=>acc+curr.rating,0)
    const multiplier = Math.pow(10,1)
    const avgReviewCount = ((toatlReviewCount/ratingArr.length)*multiplier)/multiplier
    return avgReviewCount; 
}