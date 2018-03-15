/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.manager;

import java.util.Collection;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import org.centrale.anrec.items.Water;

/**
 *
 * @author yann
 */
public class ItemManagerImpl implements ItemManager {
    
    private EntityManagerFactory emf;
    private static ItemManagerImpl theItemManager;
    
    private ItemManagerImpl(){
        if(emf == null){
            // Create the factory
            emf = Persistence.createEntityManagerFactory("water_HMIPU");
            // Clear cache
            emf.getCache().evictAll();
        }
    }
    
    public static ItemManager getInstance(){
        if(theItemManager == null){
            theItemManager = new ItemManagerImpl();
        }
        return theItemManager;
    }
    
    @Override
    public Collection<Water> page(){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findAll", Water.class);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
    
    @Override
    public Collection<Water> findByName(String name){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findByName", Water.class);
        queryProductsByName.setParameter("name", name);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
    
    @Override
    public Collection<Water> findByWaterId(int waterId){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findByWaterId", Water.class);
        queryProductsByName.setParameter("waterId", waterId);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
    
    @Override
    public Collection<Water> findByDistinctCountry(){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findByDistinctCountry", Water.class);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
}
