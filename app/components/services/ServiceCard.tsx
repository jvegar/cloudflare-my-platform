import styles from './Services.module.css';

interface ServiceCardProps {
  icon: string;
  title: string;
}

function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon}>
        <img src={icon} alt={title} width={64} height={64} />
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default ServiceCard;
