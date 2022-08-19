FROM atlastechnologiesteam/cate_base:7.3 as fm-cate
ARG user

RUN if [ $user != 'root' ]; then \
      useradd -G www-data,root -d /home/$user $user; \
      mkdir -p /home/$user/.composer && \
      chown -R $user:$user /home/$user; \
    fi
RUN adduser $user sudo \
&&  echo "${user}     ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER $user

RUN sudo apt-get update \
    && sudo apt-get install php7.3-sqlite3 -y \
    && sudo apt-get install php7.3-redis -y \
    && sudo phpenmod sqlite3 \
    && sudo apt-get clean && sudo rm -rf /var/lib/apt/lists/*
