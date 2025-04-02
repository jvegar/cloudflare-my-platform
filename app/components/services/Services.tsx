import { useDataContext } from '../../context/DataContext';
import ServiceCard from './ServiceCard';
import styles from './Services.module.css';

function Services() {
  const { data, isLoading, error } = useDataContext();
  const { services: servicesData } = data || {};

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{`Failed to fetch services data: ${(error as Error).message}`}</p>;
    }
    return (
      <>
        <h1>Services</h1>
        <p>I offer different services.</p>
        <div className={styles.servicesGrid}>
          {servicesData?.map((service) => (
            <ServiceCard key={service.id} icon={service.iconPath} title={service.title} />
          ))}
        </div>
      </>
    );
  };

  return (
    <section className={styles.servicesContainer} id="services-section">
      {renderContent()}
    </section>
  );
}

export default Services;
