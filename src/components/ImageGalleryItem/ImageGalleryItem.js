function ImageGalleryItem({ arrImages }) {
  console.log(arrImages);
  return arrImages.hits.map((obj) => {
    return (
      <li className="ImageGalleryItem" key={obj.id}>
        <img src={obj.webformatURL} alt="" className="ImageGalleryItem-image" />
      </li>
    );
  });
}

export default ImageGalleryItem;
