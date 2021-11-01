package com.spring.SpringExam.models;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Persistent_Logins")
public class Persistent_Logins {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "series", nullable = false)
    public String series;


    @Column(name = "username", nullable = false)
    public String username;


    @Column(name = "last_used", nullable = false)
    public Timestamp last_used;

    @Column(name = "token", nullable = false)
    public String token;

    public Persistent_Logins(String series, String username, Timestamp last_used, String token) {
        this.series = series;
        this.username = username;
        this.last_used = last_used;
        this.token = token;
    }

    public Persistent_Logins() {
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Timestamp getLast_used() {
        return last_used;
    }

    public void setLast_used(Timestamp last_used) {
        this.last_used = last_used;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

/*
 -- Used by Spring Remember Me API.
         CREATE TABLE Persistent_Logins (

         username varchar(64) not null,
         series varchar(64) not null,
         token varchar(64) not null,
         last_used timestamp not null,
         PRIMARY KEY (series)

         );*/
