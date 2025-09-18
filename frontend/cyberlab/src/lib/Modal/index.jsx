import './styles.scss';

export default function Modal ({open, childern, onClose, data}) {
  if(!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3>{data.title}</h3>
        <span className='modal-info'>{data.info}</span>
        <button className="modal-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
}