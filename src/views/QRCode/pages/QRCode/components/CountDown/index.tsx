import './index.scss';

export default function CountDown({ countDown }: { countDown: number }) {
  return (
    <div className={'animation-popup' + (countDown > 0 ? ' show' : '')}>
      <a className='bg'></a>
      <div className='animation-content-popup'>
        <span className='title'>Số File còn lại hoàn thành trong</span>
        <div className='circle'>
          <span>{countDown}s</span>
          <span className='check-bt'></span>
        </div>
      </div>
    </div>
  );
}
