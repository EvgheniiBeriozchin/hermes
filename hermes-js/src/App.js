import './App.css';
import Slider from "./slider";
import Header from "./header"

function App() {
const slider1Data = [{source:"https://ychef.files.bbci.co.uk/1600x900/p0d46q9y.webp", media:"BBC", citations: 3, accuracy: 4, impersonality: 4}, 
{source:"https://thumbs.dreamstime.com/b/child-hand-mud-water-playing-muddy-games-wet-child-hand-mud-water-playing-muddy-wet-152036029.jpg", media:"CNN", citations: 2, accuracy: 5, impersonality: 4}]

  return (
    <div className="App">
      <Header/>
      <div className="horizontal-block">
      <div className="feed">
        <Slider 
          slides={slider1Data} 
          text= "How mud boosts your immune system"/>
        <Slider 
          slides={[{source:"https://ichef.bbci.co.uk/news/976/cpsprodpb/6315/production/_127656352_orion.jpg.webp", media:"BBC", citations: 3, accuracy: 5, impersonality: 5}, {source:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBERERESEhIPEhASEhIREA8RERIPERERGBgZGhgYGRgcIS4mHB4rIRgZJjgmKy8/NTU1GiQ7QDs0Qi40NTEBDAwMEA8QGhISHjEhISE3NDU0NDQ0NDQ2NDQxNj00NDQ0NDE0MTE0NDExNDQ0NDQ0NDQ0NDw0MTQ0NDQ0NDQ0NP/AABEIAKkBKwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAYHBQj/xABFEAACAQIEAgYHAwkFCQAAAAABAgADEQQSITEFQQYTIlFxgQcyYZGhscEjQmIUM1Jyc4Ky0eEVJTWisyQ0Q1N0wtLw8f/EABoBAQEAAwEBAAAAAAAAAAAAAAABAgMFBgT/xAAqEQEBAAIABAQEBwAAAAAAAAAAAQIRAyExURJBscEEExQjIjNhYnGBkf/aAAwDAQACEQMRAD8A4zERAREQEREBERASZEQEmIgIiICbN0WUHMLahVJPiz/ymszbeiQuG7rLpfUdp4o9RcMwphKiKRUr1XK57MQcgUBgfA2vbTwMxqfCEW6mkiu4Zc/XtkVgdFbt31AsWG2bnqJ6eIqUmAVnKE1ilgqM2cin6t+dgLH8W0wMdiajgK+JHW0j1djTQeqTcDXXYnymHmzl5KsNwYVnp4dB266BEzH1XZD7tbXseQvsJolSmUZlYWZSVYdxBsZ07oXUBx2FQa1KVSmthbtZafabe2thoP0fCc54khWvWVrXWrUDWIIuGINiND5TKMGLERMhEREBERARESCIkyICIiAiIgIiICZlD1R5/OYczaQ7I8IGFERAREQEREBERASZEmAiIgIiICbH0bx602CWUs+QXJsdCTb/ADTX0axBIuAQSNr2O06RhcbRxdGoepVAHpvlKo3ZzKBqqLrow0MlHlYwOVVUF6z1qop9rUF1QXBuANLc7jMO6XFp1VepUWq9NS6VBY02UrUuwLC9vUyzPxFRUcKqMFapUUuqjIgCBsrNy0Fxr93ny8zi+IYurZWZDTpqwW5Q3ppnzNcHNe1rgHQaTWz7M3orUyY6nXqZKdlZziWKoGcpcAE6a6WHdNP4/QyYquMysrVKjo6srh0ZiVNx3idO6FdHjjMI1Solz1jU0ABKqERACTyNyRpyAmrekro6uBfDMq5euWorLsMyFNf8/wAJsxY1pESZEyQkSZEBERARESBESICIiAiIgIiICXWB+A7u6WplX9g+MDFiIgIiICIiAiIgJMRAREQEREombx0VRWw9ZczggYYtlKg2aobZSQdeydxzmjzo3R7A0xh3bDVKlXO2GRjXSnh+rAqKULAVG0N2Fx+j7schGPZBmYFwqGs5uwzPlABuQLfCYdDFaMDWxKHLTyUxUHVk5DYMLcyimwtv4TJrOeqbRCzHEE2AftBrFQd8t73FtxPOSutNWUKHZ6iOpqXL02AJzKW+9e9/1prZeTsvo1Yrw9Q75ytVkzZgcxCoBrzOnneaD6bMIlFOG01AFmxjWF9c7UmLak7knnNw6EYung8LUTEOq1HrtUZSwZrtTp+tlJs2l7crjaaR6Y8ZRxH5G9Kqj5OuUoM+ftFTm1FrdkDe+o0mWOU3rZ4breuTl8RE2MUREQIiIgIiICIiQREmRAREQEREBLtQm52ltdx4zIsvd8WgY0REBERAREQESYgIiICIiAkyJMoTpXRQBeH1mN9WwQ2J/wCIdgB+Kc2nVuhbEYCoc1gKnD7C57JLm/vuNpjkHSfD0hUdh2UAd0RAEU3RSSFA33N+8matisWUqMaTOylKedWVQV+92DrbUjXfvmfx2tVYJ2lSzVACHzOyuz5Dl3C3S3f3CeVgcA75w2ZABqHQjNe+zGw038pr82ydG20jfDUGJGZqaO1tyrXK89rHfxmtdKaWbDq/NKnmFYEHyuFnSsbwqgAVNR1VVstlUg5QAqiw0vbea3xfhK1sLiEpLXq1cmZaaqGYsGDWAAudrm05vC4n3Je9dHi4fb1Jy17OVRETsOUiJMiAkSZEBERARESBIkxAiIiAiIgVJuPESSRFL1h75cuP0V90CxERAREQEREBJiICIiAiIgTERKK6TAMpIDAMCVOzAHadg4BhqNXC1a32tRK2JwrOmIWmFbtIQCq6MAHG/NTOOzsXQ5C3C7B8p6/C69XmINqP4hce6Y5Dy+KV6RpplpoMr1MiItluGZyAOWqnT2+2er0V4WcQirSrPTvTYKyZgDVZU6wBidcuQDN+Ekb3nmcbRKdAMahN+syvlswbOQ/ZuQosQND3yx0fbEJTephqjE0ad8gBVlRsyq1gNzckDc5bzRWzXJufFq7Xa60zY/ogzwMZxqrQoYitT6paqU2yN1amxY5TodDox3HOepWq9ahcEdotrmA1DMD8prPFwThMSqi7MgAAOpJdRpOVwZ+Ob7+7u8ST5XLpq+jmsiZnFOH1MLWehVAWpTy5gCGFmUMpB5ghgfOYk7zzyJEmIESJMiAiLRARESBERAiJMiAiIgV09/I/Ixminz8D/KVW8PcIFqIiAiIgIiIExEQEREBJkSZQkyJMBOwdEWccMAVAS1bCspJyobCjfMwBIOnMd3eJx+dh6H11XhjhmVQtfDAszKAOzhra8pjkMLjdBlwyqFpGpmq5QH6xQxqsNGuAwvrltqcu1iD7fQ7hQp8PfrFxBqYiuzVbUq9RlRLoAWRDY6sbX+9MHpdTpU1poRSSmBmRBcH13PZUaW0W5+dgJvnQwkcNolBYEuVGRm7BckaLc6rzmiTnYz8XKNMwGJdcMwJGYVK1zZk7QqNfstqPA6y1w96mIcU2syllbX8DBxz71E9DB0UyVr1KLZq2JuHB7Jao5uAdiO/lLnDaSmvh26yhemvV2RWDOihgrWGrGxAv+H2TlyY+O99+7uW/amumuf8AjTvTFwjqKuCq6Bq1BqbAHNc0itmJ8KgH7onOJ1r06uzHh17aDFWsrJpej+l5Tks7WM1jHBt3URETNES7TpE68pambhx2R74Fs0jaWXQiZx2mNX2kGNERKEREgSJMiAiIgXKY38PjcSoKRzHvkUzofKVdY3eYFiIiAiIgIiTAREQEREBJiBKJiIgJ2boZdeGhsxOarSNtsluqWw91/MzjM690Op5uHoxZ8vWU7p2ch7VPU9m/uPKSjJ6QJUq4SkqFTWPWZS4VsqCuy3Nx6tra+0Aamb30NX+76QWoahU1k6zVc7rUdSbWGl109nM7nTeNUkHD0PbIRuwgLOWP5QQDbdvW0v7JuvRHIuAohCgW1QAqQVuHYGxFgdeY39u80Tqz8mgYQAh97GtXOu+tR5kdG6FsXR1Gj1NRrbV/jLGEbRza16tY2/faZ3Rwr+VUeX2lU6kd9S/xnJxt+bf5ekyxn00329ni+nNy39mMd2p4hjtoT1JM5NOsenMn+7AbXFKvm2BzfZX05Tk87mPR5hEiTImQTIRyCF9i/ITGMvff9/wH9IF0VTlvLLvmHn9JWv5v3/OW02PiPkZBaiIlCIiQIiIERJkQK02Pl9YDkf8A2SpsPP5CVZWOtz7zAsxEQEREBJiICIiAiIlEwIkwEREAJ1vocT/ZqBSF+0TUrn+/T5XHKcknVui1ZafD6akNfrEucrBfXX75GUHS28lHs8epMOGVG6wpZKiu6KBdTVYNZS+lwbE3vYk6Xsdv6A0snDMMoZtOscllCmzu7i4zGwswIN9RY6XtNTxqu/DwKaJUBz5adepSRQTWZs7lmCuosOyDrex0JttHQOhWp4IJWdXqZqjP9or2L1Hcm6lgbhgb37+6aZ1Z65NMo6lz31ax97tPR6M02OLo6gMGqWNgdO3b4Wnn4W5z3tc1at+6+dp63RcWxVMKc3bra2sCbve1+V5ycfzf7elzs+m1+2+jXvTxq3DjcNdMSQRsRelOSGdZ9OVv7rtt1Nex2uPsrTk5ncjy6mRKpEoga6d+kufeJ/W+RlKesPEfOSnP9U/KBc+5vprylCDQ681+sqHqe+ULz8vmIFqJJkQEREBERIIiIgXAOz5n6SQ3sPugNYDzPxix9vvgWoiICIiBMREBERASYESiZAiIExIkiBncKwZrVFUDQanUDw+NveJvtSh1bYPBKt2qHPVZQVBNmCi/IE9Yd9AFM8roTw8dZmY5adJDWxDmwC3XsK3gCzeQmw8Mr1BUxOLZzkdqdPD0CbBLorNmA5qlh36qeYmGXRY9jpdxCnh8JVFQJUKBBRwxZkDgOoDOVsQD6xTcjS66E7T6OMS9bhdKvUOZ6hrkhVRVCpUdEVQoAAAUACeDxriCLgqj9dUoIAmauM7Mt3TsqoIuxBtvYZhc2m0dEMca3D8PVIqrmzqFZ0qPYVWRSXbRiQBqNNdJqx6Mq0LAsLNb/mVPH12nr9GW/wBpp37N2qDQW0ObX63ms4XEZM1hp1lTTu7ZnqdFsQBiKa6kMXbsixBYuSNZy8cb83f6vQ5cXH6fV7X0YHpzN24aQCAaNYi+9r09D7ZygzqnpzYdZw8DNYUq47Vr6Mg5eE5WZ250ebUyJVItKJTf3n4QvPw/lCc/AyVG/h9RAqH5uW15+H1EuX7H1ltefgYFLbnxlMqaRAiIiAiIkEREQLhGg0J0+pkhT3H3SCbW8BJCQLUREBJkSYCIiAkxJAlERaVWlMBETN4XSVqgzqGVRmKsWCsARoSpBA15GBhz0eCYE16yrYEXuQdj/wC/znu4/AYapRbqsMKNWmrVTUp1KtQOiqxKlHY2G3aB0tsbyOHYpMFQLDt1W1Nhc5u6x5D+vcIG44nDJhsKadCnWqYki7vSRmYFipIbKOd9uQ1mO+KppUVVcvSpgjIjEB6jFi7sx5XIUc7IDpz1qni67FK5apY0iwpoamU1S72ZkB7RtbTnYnlri8LxLqXLq45faKfLQ6CYZTay6bXx2t+U4Z6YNwxFh3KGBGg8Jv8A0MHUcHwlO9yq1NctwT1zkHacYxmOZabE99gATfU211Gmu06h0Sx5PC8Jdu0EfMMl7E1n7j7Qe+Y+HUW3bxV6P4hcO1Uq5sruRlAvqTvfTxnkcN4rUpMtUIqVEFgrFmVtSCb6a2Ym3snTsHiM3DcSWKllw9XQaW7Ld85Lj6t7a27QuffNPC+HnW19OfxWVnhkkmtLnpP49TxxwTpbMlOstVRTZArllP3hrcAG4mhz2+OHMg/CwPwI+oni2n1yaj5FNotJnu9GejOJ4i708OqM1Nc75nVAFuBzOuplR4IG8DY+U23pD0ExuAomtXRFp51TMtRGJZr2AANztNSOx8oVJ9WULv5H5Ss+rKF3kEGUyo/SRApiSZEBERIIiIgXGU6ach8hLiA2Ettv8PgJepjT3/OBixEQEmRJgJIkSRKMzhmAfE1qdCmAalV1p0wSFBZjYXPKbJx7oBj8BhziK60uqDKrFKqsQWNhpz8pidAP8TwH/VUv4hOz+l3/AAd/2mH/AIog+dmlEreUwInocOXI99TdT6vsIvMeh6rfu/WZ+E/OL+/80genin7BOn3bXtpqLbzzj9pVzFQydYCQLL9mDqF7tJm4/wDNt+78xPHw+585B7iMLLdmGSgUy5A3WFkdCC19LB3PO9zMJaiIxsAq6bAJr7bb85YT1h+9/CZYp+qv7T/xk2q/iaudN1tcan1bk95myYDj/UItOlkqIDdyCyG+UAG43HZ2I5jumt4r16v69X+Iy/SjyGwr0mxv2iAotKoMrogYXS+uube2kxq1Oo+TIqk1HOQGpTF8up0Y7W5nTbvmEnKW6P51PF/+6WItcRVrNTYWcW2ZXXkd1JHdMRcNTyG7NnzafdTLlvqLE3vbnMvF+u/i3zmGfr9JRTRp5HuSrCx2uddbTbegvSUcKq1X6vrxURUsHyWsblvVN9vjNTHLzmVht2/Z1P4YG8dOvSEmPwv5MuHNPM1OoXapnsMuYWGUbhgb3nMW+sysduv7LD/6KTEO3nAHaUrvK/uygbiBBkSTIgXcPhnqMERSzkEhRbYC5libF0J/31f2WI/02mvNufEwIiIkERJkQLjDU/00lxNhLZ3bz+su09vf84H/2Q==", media:"Forbes", citations: 5, accuracy: 4, impersonality: 5}]} 
          text= "Artemis: Nasa expects humans to live on Moon this decade "/>
        <Slider 
          slides={[{source:"https://media.npr.org/assets/img/2021/07/14/ucsf_neurosurgery_chang_215_custom-a89ad9c50b2270461e22ea8b9e140cd183b49c6e-s800-c85.webp", media:"ScienceNews", citations: 3, accuracy: 4, impersonality: 4}, {source:"https://www.sciencenews.org/wp-content/uploads/2022/11/111422_LS_brain-implant_feat-1030x580.jpg", media:"NewScientist", citations: 5, accuracy: 4, impersonality: 4}]} 
          text= "New brain implants ‘read’ words directly from people’s thoughts"/>
      </div>
      </div>
    </div>
  );
}

export default App;