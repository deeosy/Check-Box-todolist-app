import logo from '../src/assets/check-box-logo.svg'

export default function Logo() {
  return (
    <div className="flex items-center">
        <img src={logo} alt="" className='h-15' />
        <h2 className='text-3xl italic ' >Check-Box</h2>
    </div>   
  )
}
