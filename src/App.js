import './App.css'
import {useEffect, useState} from 'react'


function importAll(r) {
  let images = {}
   r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item) })
  return images
}
const images = importAll(require.context('./backgroundImages', false, /\.png$/))
const imageNames = Object.keys(images);

function App() {
  const [currentImgName, setCurrImgName] = useState(imageNames[0])
  const [currentImg, setCurrImg] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      let currImgIndex

      setCurrImgName((currentImgName) => {
        currImgIndex = imageNames.indexOf(currentImgName) || 0
        if (currImgIndex == imageNames.length) {
          return imageNames[0]
        } else {
          return imageNames[currImgIndex+1]
        }
      })
    }, 3000)

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    loadImage(currentImgName)
  }, [currentImgName])

  const loadImage = imageName => {
    if (imageName == null) return
    import(`./backgroundImages/${imageName}`).then(image => {
      setCurrImg(image.default)
    });
  };

  return (
    <div className="App">
      <img src={currentImg} />
    </div>
  );
}

export default App;

