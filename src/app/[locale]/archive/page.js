import ArchiveContent from "@/components/archive-comps/archive-content";
import styles from "./page.module.scss";
import ArchiveForm from "@/components/archive-comps/archive-form";

export default async function ArchivePage({ searchParams }) {
  const awaitedSearchParams = await searchParams;

  return (
    <div className={styles.container}>
      <ArchiveForm defaultKeyword={awaitedSearchParams?.keyword} />
      {/* <Suspense fallback={<div>....</div>}> */}
      <ArchiveContent searchParams={awaitedSearchParams} styles={styles} />
      {/* </Suspense> */}
    </div>
  );
}
