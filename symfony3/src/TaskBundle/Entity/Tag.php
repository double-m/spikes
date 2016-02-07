<?php

namespace TaskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Task
 *
 * @ORM\Table(name="tag")
 * @ORM\Entity(repositoryClass="TaskBundle\Repository\TagRepository")
 */
class Tag
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, unique=true)
     */
    public $name;

    /**
     * @ORM\ManyToOne(targetEntity="Task", inversedBy="tags")
     */
    protected $task;

    public function setTask(Task $task)
    {
        $this->task = $task;
    }
}
