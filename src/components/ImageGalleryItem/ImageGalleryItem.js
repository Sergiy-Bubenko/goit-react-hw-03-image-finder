function ImageGalleryItem({ arrImages, givLinkForModal }) {
  console.log(arrImages);
  return arrImages.hits.map((obj) => {
    return (
      <li
        className="ImageGalleryItem"
        key={obj.id}
        id={obj.id}
        onClick={givLinkForModal}
      >
        <img
          className="ImageGalleryItem-image"
          src={obj.webformatURL}
          alt=""
          // {obj.largeImageURL}
        />
      </li>
    );
  });
}

export default ImageGalleryItem;
