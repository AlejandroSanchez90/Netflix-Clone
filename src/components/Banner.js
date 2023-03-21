import './Banner.css';

function Banner() {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };

  return (
    <header
      className='banner'
      style={{
        // backgroundImage: 'url(https://i.imgur.com/e1hLQ2m.png)',
        backgroundImage:
          'url(https://t4.ftcdn.net/jpg/05/34/71/27/360_F_534712714_cqBDuD9OC0RblKL1B8JFIKlN1BOTCrqp.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}>
      <div className='banner__contents'>
        <h1 className='banner__title'>Movie Name</h1>
        <div className='banner__buttons'>
          <button className='banner__button'>play</button>
          <button className='banner__button'>my list</button>
        </div>

        <h1 className='banner__description'>
          {truncate(
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ab, eligendi itaque fugiat molestias nulla neque eius reiciendis aut quaerat et. Molestias, eius. Saepe eveniet dignissimos dolorem, dolore architecto sequi. `,
            150
          )}
        </h1>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
