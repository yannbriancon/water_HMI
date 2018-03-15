/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.items;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author yann
 */
@Entity
@Table(name = "water")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Water.findAll", query = "SELECT w FROM Water w ORDER BY w.name")
    , @NamedQuery(name = "Water.findByWaterId", query = "SELECT w FROM Water w WHERE w.waterId = :waterId")
    , @NamedQuery(name = "Water.findByName", query = "SELECT w FROM Water w WHERE UPPER(w.name) = UPPER(:name)")
    , @NamedQuery(name = "Water.findByBeginName", query = "SELECT w FROM Water w WHERE UPPER(w.name) LIKE UPPER(:name) ORDER BY w.name")
    , @NamedQuery(name = "Water.findByCountry", query = "SELECT w FROM Water w WHERE w.country = :country ORDER BY w.name")
    , @NamedQuery(name = "Water.findByDistinctCountry", query = "SELECT w from Water w WHERE w.waterId = (SELECT MIN(w1.waterId) FROM Water w1 WHERE w.country = w1.country)")
    , @NamedQuery(name = "Water.findByMinCalcium", query = "SELECT w FROM Water w WHERE w.calcium >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxCalcium", query = "SELECT w FROM Water w WHERE w.calcium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxCalcium", query = "SELECT w FROM Water w WHERE w.calcium >= :min AND w.calcium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMagnesium", query = "SELECT w FROM Water w WHERE w.magnesium >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxMagnesium", query = "SELECT w FROM Water w WHERE w.magnesium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxMagnesium", query = "SELECT w FROM Water w WHERE w.magnesium >= :min AND w.magnesium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinSodium", query = "SELECT w FROM Water w WHERE w.sodium >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxSodium", query = "SELECT w FROM Water w WHERE w.sodium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxSodium", query = "SELECT w FROM Water w WHERE w.sodium >= :min AND w.sodium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinPotassium", query = "SELECT w FROM Water w WHERE w.potassium >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxPotassium", query = "SELECT w FROM Water w WHERE w.potassium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxPotassium", query = "SELECT w FROM Water w WHERE w.potassium >= :min AND w.potassium <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinSulfate", query = "SELECT w FROM Water w WHERE w.sulfate >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxSulfate", query = "SELECT w FROM Water w WHERE w.sulfate <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxSulfate", query = "SELECT w FROM Water w WHERE w.sulfate >= :min AND w.sulfate <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinNitrate", query = "SELECT w FROM Water w WHERE w.nitrate >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxNitrate", query = "SELECT w FROM Water w WHERE w.nitrate <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxNitrate", query = "SELECT w FROM Water w WHERE w.nitrate >= :min AND w.nitrate <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinBicarbonate", query = "SELECT w FROM Water w WHERE w.bicarbonate >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxBicarbonate", query = "SELECT w FROM Water w WHERE w.bicarbonate <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxBicarbonate", query = "SELECT w FROM Water w WHERE w.bicarbonate >= :min AND w.bicarbonate <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinChlore", query = "SELECT w FROM Water w WHERE w.chlore >= :min ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMaxChlore", query = "SELECT w FROM Water w WHERE w.chlore <= :max ORDER BY w.name")
    , @NamedQuery(name = "Water.findByMinMaxChlore", query = "SELECT w FROM Water w WHERE w.chlore >= :min AND w.chlore <= :max ORDER BY w.name")})
public class Water implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "water_id")
    private Integer waterId;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @Column(name = "country")
    private String country;
    @Basic(optional = false)
    @Column(name = "calcium")
    private float calcium;
    @Basic(optional = false)
    @Column(name = "magnesium")
    private float magnesium;
    @Basic(optional = false)
    @Column(name = "sodium")
    private float sodium;
    @Basic(optional = false)
    @Column(name = "potassium")
    private float potassium;
    @Basic(optional = false)
    @Column(name = "sulfate")
    private float sulfate;
    @Basic(optional = false)
    @Column(name = "nitrate")
    private float nitrate;
    @Basic(optional = false)
    @Column(name = "bicarbonate")
    private float bicarbonate;
    @Basic(optional = false)
    @Column(name = "chlore")
    private float chlore;

    public Water() {
    }

    public Water(Integer waterId) {
        this.waterId = waterId;
    }

    public Water(Integer waterId, String name, String country, float calcium, float magnesium, float sodium, float potassium, float sulfate, float nitrate, float bicarbonate, float chlore) {
        this.waterId = waterId;
        this.name = name;
        this.country = country;
        this.calcium = calcium;
        this.magnesium = magnesium;
        this.sodium = sodium;
        this.potassium = potassium;
        this.sulfate = sulfate;
        this.nitrate = nitrate;
        this.bicarbonate = bicarbonate;
        this.chlore = chlore;
    }

    public Integer getWaterId() {
        return waterId;
    }

    public void setWaterId(Integer waterId) {
        this.waterId = waterId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public float getCalcium() {
        return calcium;
    }

    public void setCalcium(float calcium) {
        this.calcium = calcium;
    }

    public float getMagnesium() {
        return magnesium;
    }

    public void setMagnesium(float magnesium) {
        this.magnesium = magnesium;
    }

    public float getSodium() {
        return sodium;
    }

    public void setSodium(float sodium) {
        this.sodium = sodium;
    }

    public float getPotassium() {
        return potassium;
    }

    public void setPotassium(float potassium) {
        this.potassium = potassium;
    }

    public float getSulfate() {
        return sulfate;
    }

    public void setSulfate(float sulfate) {
        this.sulfate = sulfate;
    }

    public float getNitrate() {
        return nitrate;
    }

    public void setNitrate(float nitrate) {
        this.nitrate = nitrate;
    }

    public float getBicarbonate() {
        return bicarbonate;
    }

    public void setBicarbonate(float bicarbonate) {
        this.bicarbonate = bicarbonate;
    }

    public float getChlore() {
        return chlore;
    }

    public void setChlore(float chlore) {
        this.chlore = chlore;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (waterId != null ? waterId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Water)) {
            return false;
        }
        Water other = (Water) object;
        if ((this.waterId == null && other.waterId != null) || (this.waterId != null && !this.waterId.equals(other.waterId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.centrale.anrec.items.Water[ waterId=" + waterId + " ]";
    }
    
}
