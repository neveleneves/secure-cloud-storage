import React from "react";
import StorageActionNav from "../../components/StorageActionNav/StorageActionNav";

import StorageFileStructure from "../../components/StorageFileStructure/StorageFileStructure";
import StoragePathList from "../../components/StoragePathList/StoragePathList";

import s from "./StoragePage.module.css";

export default function StoragePage() {
  return (
    <section className={s.storage}>
      <div className={`${s.wrapper} ${s.container}`}>
        <div className={s.body}>
          <div className={s.wrapperBody}>
            <div className={s.containerBody}>
              <div className={s.content}>
                <div className={s.contentHeader}>
                  <StoragePathList />
                </div>
                <div className={s.contentBody}>
                  <StorageFileStructure />
                </div>
              </div>
              <div className={s.sidebar}>
                <StorageActionNav />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
